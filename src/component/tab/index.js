import { useCallback, useEffect, useState } from "react";
import { message, Form } from "antd";
import uuid from "react-uuid";
import dayjs from "dayjs";
import update from "immutability-helper";
import { StyledManual } from "./styled";
import { TabPanel, ContentPanel } from "./panel";
import { makeToc } from "./panel/numbering-helper";

const init = {
  MLC_TITLE: undefined,
  MLC_CODE_ID: -1,
  MLC_VERSION: 1,
  MLC_STATUS: "init",
  MLC_DISPLAY: "Y",
  MLC_PUB_DTTM: dayjs().format("YYYY-MM-DD"),
  MLC_EXPIRED_DTTM: "9999-12-31",
  MLC_MGR: [],
  MLC_EDT: {
    userList: [],
    deptList: [],
    groupList: [],
  },
  MLC_SEC: {
    userList: [],
    deptList: [
      {
        DEPT_ID: 0,
        PRNT_DEPT_ID: -1,
        DEPT_CD: " ",
        DEPT_NM: "부서관리",
      },
    ],
    groupList: [],
  },
  MLC_TAB_INFO: [
    {
      TAB_KEY: "default",
      LABEL: "주요내용",
      POS: 1,
    },
  ],
  MLC_TOCLIST: {
    default: [],
  },
  MLC_TOC_CONTENTINFO: {
    default: {},
  },
  MLC_DATA: undefined,
};

const initTocItem = {
  TOCID: undefined,
  PRNT_TOCID: "root",
  TITLE: undefined,
  INDENT: 1,
};

const Edit = ({ onSave }) => {
  const [tabKey, setTabKey] = useState("default");
  const [mContent, setContent] = useState(init);
  const [numberingList, setNumberingList] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    const list = makeToc({ mContent, tabKey });
    if (list) {
      setNumberingList((prev) => ({ ...prev, ...list }));
    }
  }, [mContent, tabKey]);

  const onChangeTree = (sortTree) => {
    const { MLC_TOCLIST } = mContent;
    const nTocList = sortTree.map((s) => {
      const nToc = MLC_TOCLIST[tabKey].find((f) => String(f.TOCID) === s.key);
      return Object.assign(nToc, { PRNT_TOCID: s.prntId, INDENT: s.lvl });
    });

    setContent((prev) =>
      update(prev, {
        MLC_TOCLIST: {
          [tabKey]: { $set: [...nTocList] },
        },
      })
    );
  };

  const onCreateIndex = () => {
    const manualIndexKey = uuid();
    const tocKey = `toc-${manualIndexKey}`;
    const nToc = Object.assign({ ...initTocItem }, { TOCID: tocKey });
    const nTocItems = {
      fieldId: `item-${manualIndexKey}`,
      fieldComp: "editor-field",
      fieldVisible: true,
      TOCID: tocKey,
    };

    setContent((prev) =>
      update(prev, {
        MLC_TOCLIST: {
          [tabKey]: { $push: [nToc] },
        },

        MLC_TOC_CONTENTINFO: {
          [tabKey]: { $merge: { [tocKey]: [{ ...nTocItems }] } },
        },
      })
    );
  };

  const onChangeTocTitle = (offset, title, tocId) => {
    setContent((prev) =>
      update(prev, {
        MLC_TOCLIST: {
          [tabKey]: {
            [offset]: {
              TITLE: { $set: title },
            },
          },
        },
      })
    );
  };

  const onChangeContent = (tocId, field, content, offset) => {
    setContent((prev) =>
      update(prev, {
        MLC_TOC_CONTENTINFO: {
          [tabKey]: {
            [tocId]: {
              [offset]: { content: { $set: content } },
            },
          },
        },
      })
    );
  };

  const onAddTab = () => {
    const tabKey = uuid();
    const { MLC_TAB_INFO } = mContent;
    const addTabInfos = {
      TAB_KEY: tabKey,
      LABEL: undefined,
      POS: MLC_TAB_INFO.length + 1,
    };

    setContent((prev) =>
      update(prev, {
        MLC_TAB_INFO: { $push: [addTabInfos] },
        MLC_TOCLIST: { $merge: { [tabKey]: [] } },
        MLC_TOC_CONTENTINFO: { $merge: { [tabKey]: {} } },
      })
    );

    setTabKey(tabKey);
  };

  const onRemoveTab = (index, targetKey) => {
    setContent((prev) => {
      delete prev.MLC_TOCLIST[targetKey];
      return update(prev, {
        MLC_TAB_INFO: { $splice: [[index, 1]] },
      });
    });
  };

  const onSelectedTab = (__, tabKey) => {
    setTabKey(tabKey);
  };

  const onChangeTabInfo = useCallback((tabList) => {
    setContent((prev) => {
      return update(prev, {
        MLC_TAB_INFO: { $set: [...tabList] },
      });
    });
  }, []);

  const onChangeTitle = (e) => {
    setContent((prev) =>
      update(prev, {
        MLC_TITLE: { $set: e.target.value },
      })
    );
  };

  //우클릭으로 manual Index정보인 item
  //새로 추가할 manual의 기준이 되는 정보
  const onAddManualDownIndex = (item) => {
    const manualIndexKey = uuid();
    const tocKey = `toc-${manualIndexKey}`;
    // 기준이 되는 manual의 index (해당 값의 + 1 이 추가할 위치의 index가 된다.

    const lastChildern = numberingList[item.TOCID].lastChildIndex;
    const lastIndex = mContent.MLC_TOCLIST[tabKey].findIndex(
      (f) => f.TOCID === lastChildern
    );

    const nToc = Object.assign(
      { ...initTocItem },
      { TOCID: tocKey, PRNT_TOCID: item.TOCID, INDENT: item.INDENT + 1 }
    );

    const nTocItems = {
      fieldId: `item-${manualIndexKey}`,
      fieldComp: "editor-field",
      fieldVisible: true,
      TOCID: tocKey,
      content: undefined,
    };

    setContent((prev) =>
      update(prev, {
        MLC_TOCLIST: {
          [tabKey]: { $splice: [[lastIndex + 1, 0, nToc]] },
        },

        MLC_TOC_CONTENTINFO: {
          [tabKey]: { $merge: { [tocKey]: [{ ...nTocItems }] } },
        },
      })
    );
  };

  const onAddManualNextIndex = (item) => {
    const manualIndexKey = uuid();
    const tocKey = `toc-${manualIndexKey}`;
    // 기준이 되는 manual의 index
    let lastChildern = null;
    if (item.PRNT_TOCID === "root") {
      lastChildern = numberingList[item.TOCID].lastChildIndex;
    } else {
      lastChildern = numberingList[item.PRNT_TOCID].lastChildIndex;
    }
    // lastChildern 값이 있으면 해당 기능을 실행한다
    if (lastChildern) {
      const lastIndex = mContent.MLC_TOCLIST[tabKey].findIndex(
        (f) => f.TOCID === lastChildern
      );

      const nToc = Object.assign(
        { ...initTocItem },
        { TOCID: tocKey, PRNT_TOCID: item.PRNT_TOCID, INDENT: item.INDENT }
      );

      const nTocItems = {
        fieldId: `item-${manualIndexKey}`,
        fieldComp: "editor-field",
        fieldVisible: true,
        TOCID: tocKey,
        content: undefined,
      };

      setContent((prev) =>
        update(prev, {
          MLC_TOCLIST: {
            [tabKey]: { $splice: [[lastIndex + 1, 0, nToc]] },
          },

          MLC_TOC_CONTENTINFO: {
            [tabKey]: { $merge: { [tocKey]: [{ ...nTocItems }] } },
          },
        })
      );
    }
  };

  const onChangeManual = (nContent) => {
    setContent((prev) => {
      return update(prev, { $set: { ...nContent } });
    });
  };
  const onDeleteManualIndex = (item) => {
    //현재 index의 자식 list를 찾는다.
    const childrenList = mContent.MLC_TOCLIST[tabKey].filter(
      (f) => f.PRNT_TOCID === item.TOCID
    );
    //현재 item 의 index를 찾는다.
    const tocListIndex = mContent.MLC_TOCLIST[tabKey].findIndex(
      (f) => f.TOCID === item.TOCID
    );

    if (childrenList.length > 0) {
      if (item.TITLE) {
        message.warning(`${item.TITLE} 은(는) 하위 항목이 존재합니다.`);
      } else {
        message.warning(`해당 목차는 하위 항목이 존재합니다.`);
      }
    } else {
      setContent((prev) => {
        delete prev.MLC_TOC_CONTENTINFO[tabKey][item.TOCID];
        return update(prev, {
          MLC_TOCLIST: { [tabKey]: { $splice: [[tocListIndex, 1]] } },
        });
      });
    }
  };

  const onFinish = useCallback(
    (info) => {
      onSave({ ...mContent, MLC_TITLE: info.MLC_TITLE, MLC_DATA: { ...info } });
    },
    [mContent, onSave]
  );

  const onSubmit = useCallback(() => {
    if (form) {
      form.submit();
    }
  }, [form]);

  const onFinishFailed = ({ values, errorFields, outofDate }) => {
    console.debug("### values ===>", values);
    console.debug("### errorFields ===>", errorFields);
    console.debug("### outofDate ===>", outofDate);
  };

  console.debug(mContent);

  const onChangeContentVisible = (item, isOpen) => {
    console.debug(item);
    // console.debug(mContent.MLC_TOC_CONTENTINFO[tabKey][item.TOCID][0]);

    setContent((prev) =>
      update(prev, {
        MLC_TOC_CONTENTINFO: {
          [tabKey]: {
            [item.TOCID]: {
              $splice: [
                [
                  0,
                  1,
                  {
                    ...prev.MLC_TOC_CONTENTINFO[tabKey][item.TOCID][0],
                    fieldVisible: isOpen,
                  },
                ],
              ],
            },
          },
        },
      })
    );
  };

  return (
    <StyledManual>
      <Form
        name="frm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="tab-panel">
          <TabPanel
            tabInfos={mContent.MLC_TAB_INFO}
            onAddTab={onAddTab}
            onRemoveTab={onRemoveTab}
            onChange={onChangeTabInfo}
            selectedTabKey={tabKey}
            onSelectedTab={onSelectedTab}
            onSave={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          />
        </div>
        <div className="content-panel">
          <ContentPanel
            tabKey={tabKey}
            mContent={mContent}
            numberingList={numberingList}
            tocList={mContent.MLC_TOCLIST}
            tocContentInfo={mContent.MLC_TOC_CONTENTINFO}
            onChangeTree={onChangeTree}
            onCreateIndex={onCreateIndex}
            onChangeTitle={onChangeTitle}
            onChangeTocTitle={onChangeTocTitle}
            onChangeContent={onChangeContent}
            onChangeManual={onChangeManual}
            onAddManualDownIndex={onAddManualDownIndex}
            onAddManualNextIndex={onAddManualNextIndex}
            onDeleteManualIndex={onDeleteManualIndex}
            onChangeContentVisible={onChangeContentVisible}
          />
        </div>
      </Form>
    </StyledManual>
  );
};

export default Edit;
