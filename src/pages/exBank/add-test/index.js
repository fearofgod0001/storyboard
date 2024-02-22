import { Form, Modal } from "antd";
import { useMutation, useQuery } from "react-query";
import { ContentPannel } from "@/components";
import { useState, useCallback, useEffect } from "react";
import {
  selectExInfoList,
  selectExData,
  insertExData,
  updateExData,
  deleteExData,
  selectManualCategoryInfo,
} from "@/services/manual";
import { StyledButton, StyledModal } from "@/components/styledElement";
import uuid from "react-uuid";
import EditTest from "./edit-test";
import StyledETest from "./styled";
import EtestTree from "./etest-tree";
import ETestList from "./etest-list";
import update from "immutability-helper";

const AntModal = StyledModal(Modal);

const eTestList = [
  {
    RNUM: 1,
    FULL_PATH: " > 수신 > 수신업무편 ",
    CODE_ID: 227,
    EX_IDX: 15933,
    EX_TITLE: "수신업무 고르기",
    EX_TYPE: "MCQ",
    EX_DATA: {
      EX_DESCRIP:
        "해당 업무중 수신 업무가 아닌 것을 고르시오.해당 업무중 수신 업무가 아닌 것을 고르시오.",
      EX_MCQ_LIST: ["예제1", "예제2", "예제3", "예제4", "예제5"],
      EX_ANSWER: 2,
      EX_EXPLAIN: "수신 업무의 종류는 예제1 예제3 예제4 예제5 이다.",
    },
    REG_USER_NM: "시스템관리자",
    MLC_PUB_DTTM: "2024-01-30T15:00:00.000+00:00",
    MLC_REG_DTTM: "2024-01-31T19:04:15.000+00:00",
  },
  {
    RNUM: 2,
    FULL_PATH: " > 여신 > 가계여신상품편",
    CODE_ID: 229,
    EX_IDX: 15943,
    EX_TITLE: "가게여신상품 설명하기",
    EX_TYPE: "SAQ",
    EX_DATA: {
      EX_DESCRIP:
        "가계여신 상품에 대해서 설명하시오.가계여신 상품에 대해서 설명하시오.",
      EX_ANSWER: "가계여신",
      EX_EXPLAIN: "가계여신은 가계여신 상품입니다.",
    },
    REG_USER_NM: "이태석",
    MLC_PUB_DTTM: "2024-01-18T15:00:00.000+00:00",
    MLC_REG_DTTM: "2024-02-02T00:45:40.000+00:00",
  },
];

const exTreeData = {
  list: [
    {
      PRNT_CODE_ID: -1,
      CODE_ID: 215,
      CODE_CD: "7844",
      CODE_NM: "문제은행",
      SORT_SQ: 0,
      SORT_SUB_SQ: 1,
    },
    {
      PRNT_CODE_ID: 215,
      CODE_ID: 226,
      CODE_CD: "7853",
      CODE_NM: "수신",
      SORT_SQ: 1,
      SORT_SUB_SQ: 1,
    },
    {
      PRNT_CODE_ID: 226,
      CODE_ID: 227,
      CODE_CD: "7853",
      CODE_NM: "수신업무편",
      SORT_SQ: 1,
      SORT_SUB_SQ: 1,
    },
    {
      PRNT_CODE_ID: 215,
      CODE_ID: 228,
      CODE_CD: "7853",
      CODE_NM: "여신",
      SORT_SQ: 1,
      SORT_SUB_SQ: 1,
    },
    {
      PRNT_CODE_ID: 228,
      CODE_ID: 229,
      CODE_CD: "7853",
      CODE_NM: "가계여신상품편",
      SORT_SQ: 1,
      SORT_SUB_SQ: 1,
    },
  ],
};

const AddTest = ({}) => {
  const [form] = Form.useForm();
  const [exTreeData, setExTreeData] = useState();
  const [_eTestList, setETestList] = useState();
  const [selectNodeId, setSelectNodeId] = useState();
  //페이지네이션 관련 useState
  const [pageSize, setPageSize] = useState(10);
  const [totCount, setTotCount] = useState();
  const [cPage, setPage] = useState(1);
  const [selectedEx, setSelectedEx] = useState();
  const [pageMode, setPageMode] = useState();
  //문제 풀기 , 문제 추가 모달을 여는 state
  const [isOpenAddTest, setIsOpenAddTest] = useState(false);

  const [testType, setTestType] = useState();
  const [action, setAction] = useState();

  //분류체계를 불러올 useQuery
  const { data: treeData, isSuccess: isSuccessTreeData } = useQuery(
    "selectManualCategoryInfo",
    selectManualCategoryInfo
  );

  useEffect(() => {
    if (isSuccessTreeData && treeData) {
      const { list } = treeData;
      setExTreeData(list);
    }
  }, [isSuccessTreeData, treeData]);

  //문제 리스트를 불러오는 useQuery
  const {
    data: exDataListList,
    isSuccess: isSuccessExInfo,
    refetch: onRefetchExData,
  } = useQuery(["selectExInfoList", cPage, pageSize, selectNodeId], () =>
    selectExInfoList({
      CPAGE: cPage,
      PAGE_SIZE: pageSize,
      EX_CODE_ID: selectNodeId,
    })
  );

  useEffect(() => {
    if (exDataListList && isSuccessExInfo) {
      const { list } = exDataListList;
      setETestList(list);
    }
  }, [isSuccessExInfo, exDataListList]);

  //문제를 문제 은행에 넣을 mutation

  const {
    mutate: mutateSelectExData,
    isSuccess: isSuccessSelectExData,
    data: selectExDataInfo,
  } = useMutation("selectExData", selectExData);

  useEffect(() => {
    if (selectExDataInfo && isSuccessSelectExData) {
      const { EX_QA } = selectExDataInfo || {};
      form.setFieldsValue({ ...EX_QA });
    }
  }, [form, isSuccessSelectExData, selectExDataInfo]);

  //문제를 문제 은행에 넣을 mutation
  const {
    mutate: mutateInsertExData,
    isSuccess: isSuccessInsertExData,
    data: insertExDataData,
  } = useMutation("insertExData", insertExData);

  useEffect(() => {
    if (isSuccessInsertExData && insertExDataData) {
      onRefetchExData();
      onCancelAddTest();
    }
  }, [insertExDataData, isSuccessInsertExData, onRefetchExData]);

  //문제를 수정할 mutation
  const {
    mutate: mutateUpdateExData,
    isSuccess: isSuccessUpdateExData,
    data: UpdateExDataData,
  } = useMutation("updateExData", updateExData);

  useEffect(() => {
    if (isSuccessUpdateExData && UpdateExDataData) {
      onRefetchExData();
      onCancelAddTest();
    }
  }, [UpdateExDataData, isSuccessUpdateExData, onRefetchExData]);

  //문제를 삭제할 mutation
  const {
    mutate: mutateDeleteExData,
    isSuccess: isSuccessDeleteExData,
    data: deleteExDataData,
  } = useMutation("deleteExData", deleteExData);

  useEffect(() => {
    if (isSuccessDeleteExData && deleteExDataData) {
      onRefetchExData();
      onCancelAddTest();
    }
  }, [deleteExDataData, isSuccessDeleteExData, onRefetchExData]);

  //문제를 선택했을 때 Data를 가져올 effect
  useEffect(() => {
    if (selectedEx) {
      mutateSelectExData(selectedEx);
    }
  }, [mutateSelectExData, selectedEx]);

  //트리데이터 선택시 실행하는 함수
  const onSelectTreeNode = (codeIds, e) => {
    const exCodeId = codeIds[0];
    setSelectNodeId(exCodeId);
    form.setFieldsValue({
      CODE_ID: exCodeId,
    });
  };

  //문제 제목 클릭시 record를 전달받아 form-Field를 채울 함수
  const onShowEdit = useCallback((record) => {
    const { EX_TYPE } = record || {};
    form.setFieldsValue({ ...record });
    setTestType(EX_TYPE);
    setSelectedEx(record);
    setPageMode("V");
    setIsOpenAddTest(true);
  }, []);

  //페이지네이션 함수
  const onChangePage = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  //문제 추가 모달창을 여는 함수
  const onCreateTest = () => {
    setPageMode("N");
    setAction("N");
    setIsOpenAddTest(true);
  };

  const onChangeETestType = (type) => {
    setTestType(type);
  };

  //문제 추가 버튼 렌더함수
  const renderButton = () => {
    return (
      <StyledButton className="btn-primary" onClick={onCreateTest}>
        문제 추가
      </StyledButton>
    );
  };

  //pageMode를 바꾸는 함수
  const onChangePageMode = (pMode) => {
    setPageMode(pMode);
  };

  //모달 취소버튼
  const onCancelAddTest = useCallback(() => {
    form.resetFields();
    setSelectedEx();
    setTestType();
    setIsOpenAddTest(false);
  }, [form]);

  const onFinish = (info) => {
    if (info) {
      console.debug("info", info);
      const { EX_IDX } = info || {};
      if (action === "N") {
        const exIdx = uuid();
        //새로운 문제 추가 로직
        setETestList((prev) => {
          return update(prev, {
            $push: [
              {
                ...info,
                RNUM: prev.length + 1,
                REG_USER_NM: "관리자",
                EX_IDX: exIdx,
              },
            ],
          });
        });
        mutateInsertExData({ ...info, EX_IDX: exIdx });
        setAction();
      } else if (action === "M") {
        //기존 문제 수정 로직
        setETestList((prev) => {
          const index = prev.findIndex((f) => f.EX_IDX === EX_IDX);
          if (index !== -1) {
            return update(prev, {
              $splice: [
                [
                  index,
                  1,
                  {
                    ...info,
                    RNUM: prev[index].RNUM,
                    FULL_PATH: prev[index].FULL_PATH,
                    REG_USER_NM: prev[index].REG_USER_NM,
                  },
                ],
              ],
            });
          }
        });
        mutateUpdateExData({ ...info });
        setAction();
      }
    }
    setIsOpenAddTest(false);
  };

  const onChangeAction = (_action) => {
    setAction(_action);
    if (_action === "D") {
      const { EX_IDX } = selectedEx || {};
      mutateDeleteExData({ EX_IDX: EX_IDX });
    }
  };

  return (
    <StyledETest>
      <div className="left-panel">
        <EtestTree
          exTreeData={exTreeData}
          onSelectTreeNode={onSelectTreeNode}
        />
      </div>

      <div className="content-panel">
        <ContentPannel pathInfo={"문제항목 관리"} renderButton={renderButton}>
          <ETestList
            cPage={cPage}
            pageSize={pageSize}
            totCount={totCount}
            eTestList={_eTestList}
            onShowEdit={onShowEdit}
            onChangePage={onChangePage}
          />
          <AntModal
            open={isOpenAddTest}
            title={
              <div className="ant-modal-title" style={{ color: "white" }}>
                문제 추가
              </div>
            }
            onCancel={onCancelAddTest}
            footer={false}
            destroyOnClose
          >
            <EditTest
              form={form}
              testType={testType}
              pageMode={pageMode}
              onFinish={onFinish}
              selectedEx={selectedEx}
              exTreeData={exTreeData}
              onChangeAction={onChangeAction}
              onSelectTreeNode={onSelectTreeNode}
              onChangePageMode={onChangePageMode}
              onChangeETestType={onChangeETestType}
            />
          </AntModal>
        </ContentPannel>
      </div>
    </StyledETest>
  );
};

export default AddTest;
