import { useCallback, useEffect, useState } from "react";
import update from "immutability-helper";
import { StyledManual } from "./styled";
import { TabPanel, ContentPanel } from "./panel";
import { numberingData } from "./panel/numbering-helper";
import uuid from "react-uuid";
import { message } from "antd";

const init = {
  MLC_TITLE: undefined,
  MLC_CODE_ID: -1,
  MLC_VERSION: 1,
  MLC_STATUS: "init",
  MLC_DISPLAY: "Y",
  MLC_PUB_DTTM: undefined,
  MLC_EXPIRED_DTTM: undefined,
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

  useEffect(() => {
    const list = numberingData({ mContent, tabKey });
    setNumberingList(list);
  }, [mContent]);

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
    const nToc = Object.assign({ ...initTocItem }, { TOCID: manualIndexKey });
    const nTocItems = {
      fieldId: `item-${manualIndexKey}`,
      fieldComp: "editor-field",
      content: undefined,
    };

    setContent((prev) =>
      update(prev, {
        MLC_TOCLIST: {
          [tabKey]: { $push: [nToc] },
        },

        MLC_TOC_CONTENTINFO: {
          [tabKey]: { $merge: { [manualIndexKey]: [{ ...nTocItems }] } },
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

  const _onSave = (e) => {
    onSave({ ...mContent }, e);
  };

  //우클릭으로 manual Index정보인 item
  //새로 추가할 manual의 기준이 되는 정보
  const onAddManualDownIndex = (item) => {
    const manualIndexKey = uuid();
    // 기준이 되는 manual의 index (해당 값의 + 1 이 추가할 위치의 index가 된다.
    const prntIndex = mContent.MLC_TOCLIST[tabKey].findIndex(
      (f) => f.TOCID === item.TOCID
    );

    const inputIndex = prntIndex + 1;

    const nToc = Object.assign(
      { ...initTocItem },
      { TOCID: manualIndexKey, PRNT_TOCID: item.TOCID, INDENT: item.INDENT + 1 }
    );

    const nTocItems = {
      fieldId: `item-${manualIndexKey}`,
      fieldComp: "editor-field",
      content: undefined,
    };

    setContent((prev) =>
      update(prev, {
        MLC_TOCLIST: {
          [tabKey]: { $splice: [[inputIndex, 0, nToc]] },
        },

        MLC_TOC_CONTENTINFO: {
          [tabKey]: { $merge: { [manualIndexKey]: [{ ...nTocItems }] } },
        },
      })
    );
  };

  const onAddManualNextIndex = (item) => {
    const manualIndexKey = uuid();
    // 기준이 되는 manual의 index
    const lastIndex = mContent.MLC_TOCLIST[tabKey].findIndex(
      (f) => f.TOCID === item.TOCID
    );

    const nToc = Object.assign(
      { ...initTocItem },
      {
        TOCID: manualIndexKey,
        PRNT_TOCID: item.PRNT_TOCID,
        INDENT: item.INDENT,
      }
    );

    const nTocItems = {
      fieldId: `item-${manualIndexKey}`,
      fieldComp: "editor-field",
      content: undefined,
    };

    setContent((prev) =>
      update(prev, {
        MLC_TOCLIST: {
          [tabKey]: { $splice: [[lastIndex, 0, nToc]] },
        },

        MLC_TOC_CONTENTINFO: {
          [tabKey]: { $merge: { [manualIndexKey]: [{ ...nTocItems }] } },
        },
      })
    );
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

  return (
    <StyledManual>
      <div className="tab-panel">
        <TabPanel
          tabInfos={mContent.MLC_TAB_INFO}
          onAddTab={onAddTab}
          onRemoveTab={onRemoveTab}
          onChange={onChangeTabInfo}
          selectedTabKey={tabKey}
          onSelectedTab={onSelectedTab}
          onSave={(e) => {
            _onSave(e);
          }}
        />
      </div>
      <div className="content-panel">
        <ContentPanel
          mContent={mContent}
          numberingList={numberingList}
          tocList={mContent.MLC_TOCLIST[tabKey]}
          tocContentInfo={mContent.MLC_TOC_CONTENTINFO[tabKey]}
          onChangeTree={onChangeTree}
          onCreateIndex={onCreateIndex}
          onChangeTitle={onChangeTitle}
          onChangeTocTitle={onChangeTocTitle}
          onChangeContent={onChangeContent}
          onAddManualDownIndex={onAddManualDownIndex}
          onAddManualNextIndex={onAddManualNextIndex}
          onDeleteManualIndex={onDeleteManualIndex}
        />
      </div>
    </StyledManual>
  );
};

export default Edit;
