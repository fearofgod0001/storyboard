import { useQuery } from "react-query";
import { ContentPannel } from "@/components";
import { Form, Modal, message } from "antd";
import { useState, useCallback, useEffect } from "react";
import { selectManualCategoryInfo } from "@/services/manual";
import { StyledButton, StyledModal } from "@/components/styledElement";

import uuid from "react-uuid";
import StyledEditEtest from "./styled";
import update from "immutability-helper";
import TestBankList from "./testbank-list";
import TestBankEdit from "./testbank-edit";

const AntModal = StyledModal(Modal);

const exTestList = [
  {
    RNUM: 1,
    EX_TEST_IDX: 15933,
    EX_TEST_TITLE: "수신업무 고르기",
    EX_START_DATE: "2024-01-30T15:00:00.000+00:00",
    EX_TEST_RUNTIME: "60분",
    REG_USER_NM: "시스템관리자",
    EX_TEST_STATUS: "대기",
    MLC_PUB_DTTM: "2024-01-30T15:00:00.000+00:00",
  },
  {
    RNUM: 2,
    EX_TEST_IDX: 15943,
    EX_TEST_TITLE: "가게여신상품 설명하기",
    EX_START_DATE: "2024-01-30T15:00:00.000+00:00",
    EX_TEST_RUNTIME: "60분",
    REG_USER_NM: "이태석",
    EX_TEST_STATUS: "대기",
    MLC_PUB_DTTM: "2024-01-18T15:00:00.000+00:00",
  },
];

const EditTestBank = ({}) => {
  const [form] = Form.useForm();
  const [exTreeData, setExTreeData] = useState();
  const [_exList, setExList] = useState(exTestList);
  const [exItemList, setExItemList] = useState([]);
  const [pageMode, setPageMode] = useState();

  const [action, setAction] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [totCount, setTotCount] = useState();
  const [cPage, setPage] = useState(1);

  const [isOpenEdit, setIsOpenEdit] = useState();
  const [isOpenSelectItem, setOpenSelectItem] = useState();

  const [exColumn, setExColumn] = useState();

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

  //문제 제목 클릭시 record를 전달받아 form-Field를 채울 함수
  const onShowEdit = useCallback((record) => {}, []);

  //페이지네이션 함수
  const onChangePage = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const onCreateTest = () => {
    setPageMode("N");
    setIsOpenEdit(true);
  };

  const onCancel = () => {
    setIsOpenEdit(false);
  };

  //시험지 문제를 추가하는 함수
  const onAddTestItem = (item, _index) => {
    if (item) {
      //중복 여부 체크
      const exist = exItemList.some((f) => f.EX_IDX === item.EX_IDX);
      if (!exist) {
        //index값이 있으면 그 다음 칸에 문제를 추가
        if (_index) {
          setExItemList((prev) => {
            return update(prev, {
              $splice: [[_index, 0, item]],
            });
          });
          //index값이 없으면 맨 뒤에 문제를 추가
        } else {
          setExItemList((prev) => {
            return update(prev, {
              $splice: [[exItemList.length, 0, item]],
            });
          });
        }
        onHandleSelectItem(false);
      } else {
        message.error("동일한 문제가 존재합니다.");
      }
    }
  };

  //시험지 문제를 삭제하는 함수
  const onRemoveTestItem = (index, exIdx) => {
    setExItemList((prev) => {
      return update(prev, {
        $splice: [[index, 1]],
      });
    });
  };

  //문제 추가 버튼 렌더함수
  const renderButton = () => {
    return (
      <StyledButton className="btn-primary" onClick={onCreateTest}>
        e-test 생성
      </StyledButton>
    );
  };

  const onDragEnd = (result) => {
    const { source } = result;
    const { destination } = result;

    if (!destination) {
      return;
    }

    setExItemList((prev) => {
      return update(prev, {
        $splice: [
          [source.index, 1],
          [destination.index, 0, { ...prev[source.index] }],
        ],
      });
    });
  };

  //선택한 문제의 모달창을 열고 닫는 함수
  const onHandleSelectItem = (bool) => {
    setOpenSelectItem(bool);
  };

  //단 설정 하는 함수
  const onHandleColumn = (val) => {
    setExColumn(val);
  };

  const onChangePageMode = (mode) => {
    setPageMode(mode);
  };

  const onChangeAction = (_action) => {
    setAction(_action);
  };

  const onFinishFailed = ({ __, errorFields }) => {
    message.error(
      errorFields.map((err, i) =>
        i === 0 ? err.errors : <div>{err.errors}</div>
      )
    );
  };

  const onFinish = useCallback(
    (info) => {
      if (info) {
        const { EX_START_DATE } = info || {};
        console.debug("EX_START_DATE", EX_START_DATE);
        const { $y, $M, $D } = EX_START_DATE || {};
        console.debug("$y", $y);
        if (action === "N") {
          const exTestIdx = uuid();
          //시험지 추가 로직
          // mutateInsertExData({ ...info, EX_TEST_IDX: exTestIdx });
          setAction();
        } else if (action === "M") {
          //기존 문제 수정 로직
          // mutateUpdateExData({ ...info });
          setAction();
        }
      }
    },
    [action]
  );

  return (
    <StyledEditEtest>
      <ContentPannel pathInfo={"출제 시험"} renderButton={renderButton}>
        <TestBankList
          cPage={cPage}
          exList={_exList}
          exColumn={exColumn}
          pageSize={pageSize}
          totCount={totCount}
          onShowEdit={onShowEdit}
          onChangePage={onChangePage}
        />
        <AntModal
          width="100%"
          autoHeight
          title={
            <div className="modal-header">
              <div>문제 은행</div>
              <div>
                <StyledButton
                  className="btn-white btn-xs mr10"
                  onClick={() => {
                    form.submit();
                    onFinish();
                  }}
                >
                  저장
                </StyledButton>
                <StyledButton className="btn-white btn-xs" onClick={onCancel}>
                  닫기
                </StyledButton>
              </div>
            </div>
          }
          open={isOpenEdit}
          onCancel={onCancel}
          footer={false}
          destroyOnClose
        >
          <TestBankEdit
            form={form}
            pageMode={pageMode}
            onFinish={onFinish}
            exColumn={exColumn}
            onDragEnd={onDragEnd}
            exItemList={exItemList}
            exTreeData={exTreeData}
            onAddTestItem={onAddTestItem}
            onFinishFailed={onFinishFailed}
            onHandleColumn={onHandleColumn}
            isOpenSelectItem={isOpenSelectItem}
            onRemoveTestItem={onRemoveTestItem}
            onHandleSelectItem={onHandleSelectItem}
          />
        </AntModal>
      </ContentPannel>
    </StyledEditEtest>
  );
};

export default EditTestBank;
