import { useCallback, useEffect, useState } from "react";
import { message, Form, Input, Modal, Result } from "antd";
import uuid from "react-uuid";
import dayjs from "dayjs";
import update from "immutability-helper";
import { StyledManual } from "./styled";
import { TabPanel } from "./panel";
import ContentPanel from "./panel/content-panel";
import DiffPanel from "./panel/diff-panel";
import { makeToc } from "./panel/numbering-helper";

import { useMutation, useQueryClient } from "react-query";
import {
  selectMlCBymlcIdx,
  insertNewVersionMlContentInfo,
  updateMlContentInfo,
  deleteMlcContentInfoBymlcIdx,
  insertContentReqData,
  selectContentReqDataByMlcIdx,
  updateContReqDataByPosId,
} from "../../services/manual";

const init = {
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
  MLC_DATA: {
    MLC_TITLE: undefined,
    MLC_CODE_ID: undefined,
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
  },
};

const initTocItem = {
  TOCID: undefined,
  PRNT_TOCID: "root",
  TITLE: undefined,
  INDENT: 1,
};

const Edit = ({
  form,
  treeData,
  curentMlc,
  pageMode = "I",
  onChangePageMode,
  onCancel,
  onRefetchManualList,
  mlcCodeId,
}) => {
  const [tabKey, setTabKey] = useState("default");
  const [action, setAction] = useState();
  const [mContent, setContent] = useState(init);
  const [numberingList, setNumberingList] = useState();
  const [isShowConfirm, setShowConfirm] = useState(false);
  const [diffContent, setDiffContent] = useState(false);
  const [isDiffOpen, setIsDiffOpen] = useState(false);
  const [isContReqDataOpen, setIsContReqDataOpen] = useState(false);
  const [compReqData, setCompReqData] = useState();
  const [contReqList, setContReqList] = useState([]);

  const [selectedMlc, setSelectedMlc] = useState();
  const [viewMode, setViewMode] = useState("wide");
  const [_mlcCodeId, setMlcCodeId] = useState();
  const queryClient = useQueryClient();

  useEffect(() => {
    setMlcCodeId(mlcCodeId);
  }, [mlcCodeId]);

  useEffect(() => {
    if (curentMlc) {
      setSelectedMlc(curentMlc);
    }
  }, [curentMlc]);

  useEffect(() => {
    const list = makeToc({ mContent, tabKey });
    if (list) {
      setNumberingList((prev) => ({ ...prev, ...list }));
    }

    const { MLC_IDX } = mContent;

    if (MLC_IDX) {
      mutateSelectContReqData({
        MLC_IDX: MLC_IDX,
      });
    }
  }, [mContent, tabKey]);

  console.debug("mContent", mContent);

  useEffect(() => {
    if (pageMode === "I") {
      const nData = Object.assign(mContent.MLC_DATA, {
        MLC_CODE_ID: _mlcCodeId,
        MLC_EDT: {
          userList: [],
          deptList: [],
          groupList: [],
        },
      });
      form.setFieldsValue({ ...nData });
    }
  }, [form, mContent.MLC_DATA, pageMode, _mlcCodeId]);

  const {
    mutate: selectMutate,
    isSuccess: isSuccessMutate,
    data: selectMutateData,
  } = useMutation("selectMlCBymlcIdx", selectMlCBymlcIdx);

  useEffect(() => {
    if (selectedMlc) {
      selectMutate(selectedMlc);
    }
  }, [selectMutate, selectedMlc]);

  const onChangeCompareData = (lowVerData) => {
    setDiffContent(lowVerData);
  };

  const onChangeManualPage = (mlcIdx) => {
    selectMutate({ MLC_IDX: mlcIdx });
  };

  useEffect(() => {
    if (isSuccessMutate && selectMutateData) {
      const { mlcInfo } = selectMutateData;
      setContent(mlcInfo);
      form.setFieldsValue({
        ...mlcInfo.MLC_DATA,
        MLC_IDX: mlcInfo.MLC_IDX,
        MLC_ORG_IDX: mlcInfo.MLC_ORG_IDX,
        MLC_VERSION: mlcInfo.MLC_VERSION,
        MLC_STATUS: mlcInfo.MLC_STATUS,
      });
    }
  }, [selectMutateData, isSuccessMutate, form]);

  const { mutate: mutateNewMlContent, isSuccess: isSuccessNewMlContent } =
    useMutation("insertNewVersionMlContentInfo", insertNewVersionMlContentInfo);

  useEffect(() => {
    if (isSuccessNewMlContent) {
      onRefetchManualList();
      onCancel();
    }
  }, [isSuccessNewMlContent, onCancel, onRefetchManualList, queryClient]);

  const {
    mutate: mutateUpdateContent,
    isSuccess: isSuccessUpdateMlContentInfo,
  } = useMutation("updateMlContentInfo", updateMlContentInfo);

  useEffect(() => {
    if (isSuccessUpdateMlContentInfo) {
      onRefetchManualList();
      onCancel();
    }
  }, [
    isSuccessUpdateMlContentInfo,
    onCancel,
    onRefetchManualList,
    queryClient,
  ]);

  const { mutate: mutateDeleteContent, isSuccess: isSuccesDeleteContent } =
    useMutation("deleteMlcContentInfoBymlcIdx", deleteMlcContentInfoBymlcIdx);

  //수정 요청 Insert
  const { mutate: mutateInsertContentReq } = useMutation(
    "insertContentReqData",
    insertContentReqData
  );

  // 수정 요청 Select
  const {
    mutate: mutateSelectContReqData,
    isSuccess: isSuccessSelectContReqData,
    data: selectContReqDataByMlcIdxdata,
  } = useMutation("selectContentReqDataByMlcIdx", selectContentReqDataByMlcIdx);

  useEffect(() => {
    if (isSuccessSelectContReqData && selectContReqDataByMlcIdxdata) {
      const { reqData } = selectContReqDataByMlcIdxdata;
      setContReqList(reqData);
    }
  }, [isSuccessSelectContReqData, selectContReqDataByMlcIdxdata]);

  // 수정 요청 update
  const {
    mutate: mutateUpdateContReqData,
    isSuccess: isSuccessUpdateContReqData,
    data: updateContReqData,
  } = useMutation("updateContReqDataByPosId", updateContReqDataByPosId);

  useEffect(() => {
    if (isSuccessUpdateContReqData) {
      onHandleContReqModal(false);
    }
  }, [isSuccessUpdateContReqData]);

  const onFinish = useCallback(
    (info) => {
      if (action) {
        if (["S", "N"].includes(action)) {
          mutateNewMlContent({
            ...mContent,
            pageMode,
            MLC_IDX: info.MLC_IDX,
            MLC_ORG_IDX: info.MLC_ORG_IDX,
            MLC_VERSION: info.MLC_VERSION,
            MLC_TITLE: info.MLC_TITLE,
            MLC_STATUS: info.MLC_STATUS,
            MLC_DATA: info,
          });
          setAction();
        } else if (action === "M") {
          mutateUpdateContent({
            ...mContent,
            pageMode,
            MLC_IDX: info.MLC_IDX,
            MLC_ORG_IDX: info.MLC_ORG_IDX,
            MLC_VERSION: info.MLC_VERSION,
            MLC_TITLE: info.MLC_TITLE,
            MLC_STATUS: info.MLC_STATUS,
            MLC_DATA: info,
          });
          setAction();
        } else if (action === "D") {
          mutateDeleteContent({ ...mContent, pageMode });
          setAction();
        }
      }
    },
    [
      action,
      mutateNewMlContent,
      mContent,
      mutateUpdateContent,
      mutateDeleteContent,
      pageMode,
    ]
  );

  useEffect(() => {
    if (isSuccesDeleteContent) {
      onRefetchManualList();
      onCancel();
    }
  }, [isSuccesDeleteContent, onCancel, onRefetchManualList, queryClient]);

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

  const onAddManualNextIndex = (_item) => {
    let item = _item;

    if (!_item.PRNT_TOCID) {
      item = mContent.MLC_TOCLIST[tabKey].filter(
        (f) => f.TOCID === _item.TOCID
      )[0];
    }

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

  const onDeleteManualIndex = (item) => {
    // 현재 index의 자식 list를 찾는다.
    const childrenList = mContent.MLC_TOCLIST[tabKey].filter(
      (f) => f.PRNT_TOCID === item.TOCID
    );
    //현재 item 의 index를 찾는다.
    const tocListIndex = mContent.MLC_TOCLIST[tabKey].findIndex(
      (f) => f.TOCID === item.TOCID
    );

    if (!item.fieldId) {
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
    } else {
      setContent((prev) =>
        update(prev, {
          MLC_TOC_CONTENTINFO: {
            [tabKey]: {
              [item.TOCID]: {
                $splice: [[item.index, 1]],
              },
            },
          },
        })
      );
    }
  };

  const onFinishFailed = ({ __, errorFields }) => {
    message.error(
      errorFields.map((err, i) =>
        i === 0 ? err.errors : <div>{err.errors}</div>
      )
    );
  };

  const onChangeContentVisible = (item, index, isOpen) => {
    setContent((prev) =>
      update(prev, {
        MLC_TOC_CONTENTINFO: {
          [tabKey]: {
            [item.TOCID]: {
              $splice: [
                [
                  index ?? item.index,
                  1,
                  {
                    ...prev.MLC_TOC_CONTENTINFO[tabKey][item.TOCID][
                      index ?? item.index
                    ],
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

  const onAddCompField = (item, fieldComp) => {
    const manualIndexKey = uuid();

    const nTocItems = {
      fieldId: `item-${manualIndexKey}`,
      fieldComp,
      fieldVisible: true,
      TOCID: item.TOCID,
      content: undefined,
    };

    setContent((prev) =>
      update(prev, {
        MLC_TOC_CONTENTINFO: {
          [tabKey]: { [item.TOCID]: { $push: [nTocItems] } },
        },
      })
    );
  };

  const onDragEnd = (result) => {
    //원래 있던 자리
    const { source } = result;
    //이동할 자리
    const { destination } = result;
    //이동할 content Id
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      //같은 곳 에서 splice 하는 코드
      setContent((prev) => {
        return update(prev, {
          MLC_TOC_CONTENTINFO: {
            [tabKey]: {
              [destination.droppableId]: {
                $splice: [
                  [source.index, 1],
                  [
                    destination.index,
                    0,
                    {
                      ...prev.MLC_TOC_CONTENTINFO[tabKey][source.droppableId][
                        source.index
                      ],
                    },
                  ],
                ],
              },
            },
          },
        });
      });
    } else {
      // tocId가 다른 곳에서 splice하는 코드
      setContent((prev) => {
        return update(prev, {
          MLC_TOC_CONTENTINFO: {
            [tabKey]: {
              [destination.droppableId]: {
                $splice: [
                  [
                    destination.index,
                    0,
                    {
                      ...prev.MLC_TOC_CONTENTINFO[tabKey][source.droppableId][
                        source.index
                      ],
                      TOCID: destination.droppableId,
                    },
                  ],
                ],
              },
              [source.droppableId]: {
                $splice: [[source.index, 1]],
              },
            },
          },
        });
      });
    }
  };

  const onConfirmCancel = () => {
    setShowConfirm(false);
    setAction();
  };

  const onConfirmSave = (action) => {
    setAction(action);
    setShowConfirm(true);
  };

  const onSaveDo = (status) => {
    mutateUpdateContReqData({ COMP_DATA: compReqData });
    form.setFieldValue("MLC_STATUS", status);
    form.submit();
  };

  const onDeleteDo = () => {
    setAction("D");
    form.submit();
  };

  //조문 비교 열고 닫기
  const onHandlelEntireDiff = () => {
    setIsDiffOpen(!isDiffOpen);
  };

  //수정요청 정보 전송
  const onContentReqSubmit = (reqData) => {
    const { MLC_IDX, MLC_ORG_IDX } = mContent;
    mutateInsertContentReq({
      ...reqData,
      MLC_IDX: MLC_IDX,
      MLC_ORG_IDX: MLC_ORG_IDX,
    });
  };

  const onChangeViewMode = (mode) => {
    console.debug("mode", mode);
    setViewMode(mode);
  };

  //수정 요청 값
  const onChangeMlcData = (getData) => {
    const { COMP_DATA } = getData;
    setCompReqData(COMP_DATA);
    onChangePageMode("N");
    onHandleContReqModal(false);
  };

  //수정요청 모달창 열기
  const onHandleContReqModal = (isOpen) => {
    setIsContReqDataOpen(isOpen);
  };

  return (
    <StyledManual>
      <Modal
        title="배포방법"
        open={isShowConfirm}
        width={700}
        footer={false}
        onCancel={onConfirmCancel}
      >
        <Result
          status="success"
          title="배포방법을 선택해 주세요? "
          extra={
            <div>
              <button
                className="btn-green btn-lg mr10"
                onClick={() => onSaveDo("PUBS")}
              >
                확정 배포
              </button>
              <button
                className="btn-secondary btn-lg mr10"
                onClick={() => onSaveDo("WAIT")}
              >
                예약 배포
              </button>
              <button
                className="btn-primary btn-lg"
                onClick={() => onSaveDo("INIT")}
              >
                임시 저장
              </button>
            </div>
          }
        />
      </Modal>
      <Form
        name="frm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="MLC_IDX" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="MLC_ORG_IDX" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="MLC_VERSION" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="MLC_STATUS" hidden>
          <Input />
        </Form.Item>
        <div className="tab-panel">
          <TabPanel
            pageMode={pageMode}
            tabInfos={mContent?.MLC_TAB_INFO}
            mlcStatus={mContent?.MLC_STATUS}
            curentMlc={curentMlc}
            selectedMlc={mContent}
            onAddTab={onAddTab}
            onRemoveTab={onRemoveTab}
            onChange={onChangeTabInfo}
            selectedTabKey={tabKey}
            onSelectedTab={onSelectedTab}
            onChangePageMode={onChangePageMode}
            onSave={() => {
              onConfirmSave("S");
            }}
            onModify={() => {
              onConfirmSave("M");
            }}
            onCancel={onCancel}
            onDeleteDo={onDeleteDo}
          />
        </div>
        <div className="content-panel" style={{ position: "fixed" }}>
          <ContentPanel
            tabKey={tabKey}
            pageMode={pageMode}
            viewMode={viewMode}
            treeData={treeData}
            curentMlc={curentMlc}
            selectedMlc={mContent}
            mContent={mContent}
            numberingList={numberingList}
            tocList={mContent.MLC_TOCLIST}
            tocContentInfo={mContent.MLC_TOC_CONTENTINFO}
            onChangeViewMode={onChangeViewMode}
            onChangeTree={onChangeTree}
            onCreateIndex={onCreateIndex}
            onChangeTitle={onChangeTitle}
            onChangeTocTitle={onChangeTocTitle}
            onChangeContent={onChangeContent}
            onChangeManualPage={onChangeManualPage}
            onChangeCompareData={onChangeCompareData}
            onAddManualDownIndex={onAddManualDownIndex}
            onAddManualNextIndex={onAddManualNextIndex}
            onDeleteManualIndex={onDeleteManualIndex}
            onChangeContentVisible={onChangeContentVisible}
            onAddCompField={onAddCompField}
            onDragEnd={onDragEnd}
            diffContent={diffContent}
            onHandlelEntireDiff={onHandlelEntireDiff}
            onChangePageMode={onChangePageMode}
            onContentReqSubmit={onContentReqSubmit}
            contReqList={contReqList}
            onChangeMlcData={onChangeMlcData}
            isContReqDataOpen={isContReqDataOpen}
            onHandleContReqModal={onHandleContReqModal}
            mutateSelectContReqData={mutateSelectContReqData}
          />
        </div>

        <Modal
          className="modal-notitle-full-screen"
          open={isDiffOpen}
          onCancel={onHandlelEntireDiff}
          autoHeight
          footer={false}
          destroyOnClose
        >
          <DiffPanel
            mContent={mContent}
            tabKey={tabKey}
            onChangeManualPage={onChangeManualPage}
            pageMode={pageMode}
            numberingList={numberingList}
            tocList={mContent.MLC_TOCLIST}
            tocContentInfo={mContent.MLC_TOC_CONTENTINFO}
          />
        </Modal>
      </Form>
    </StyledManual>
  );
};

export default Edit;
