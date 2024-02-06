import { useState, useCallback } from "react";
import { ContentPannel } from "../../../component/panel";
import StyledButton from "../../../component/styledElement/styled-button";
import StyledModal from "../../../component/styledElement/styled-modal";
import { Modal, Checkbox } from "antd";
import StyledExBankContentPanel from "./styled";
import List from "./list";
import EditQuestion from "./edit-question";

const AntModal = StyledModal(Modal);

const mList = [
  {
    RNUM: 1,
    FULL_PATH: " > 수신 > 수신업무편 ",
    MLC_IDX: 15933,
    MLC_TITLE: "완전가스의 비열비에 대한 설명 중 틀린 것은?",
    EX_TYPE: "객관식",
    REG_USER_ID: 1,
    REG_USER_NM: "시스템관리자",
    REG_DEPT_ID: 0,
    REG_DEPT_NM: "부서관리",
    MLC_PUB_DTTM: "2024-01-30T15:00:00.000+00:00",
    MLC_EXPIRED_DTTM: "9999-12-30T15:00:00.000+00:00",
    MLC_REG_DTTM: "2024-01-31T19:04:15.000+00:00",
    TOTAL_CNT: 3910,
    RNO: 3910,
  },
  {
    RNUM: 2,
    FULL_PATH: " > 여신 > 가계여신상품편",
    MLC_IDX: 15943,
    MLC_TITLE: "열역학 제2법칙에 대한 설명으로 옳은 것은?",
    EX_TYPE: "주관식",
    REG_USER_ID: 2,
    REG_USER_NM: "이태석",
    REG_DEPT_ID: 0,
    REG_DEPT_NM: "부서관리",
    MLC_PUB_DTTM: "2024-01-18T15:00:00.000+00:00",
    MLC_EXPIRED_DTTM: "9999-12-30T15:00:00.000+00:00",
    MLC_REG_DTTM: "2024-02-02T00:45:40.000+00:00",
    TOTAL_CNT: 3910,
    RNO: 3909,
  },
];

const plainOptions = ["객관식", "주관식"];
const defaultCheckedList = ["객관식", "주관식"];

const ExBankContentPanel = ({ exDataList, onSelectTreeNode, selectNodeId }) => {
  const [_mList, setMlist] = useState(mList);
  const [isOpen, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [selectedMlc, setSelectedMlc] = useState();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const CheckboxGroup = Checkbox.Group;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  //문제 추가 버튼을 누르면 실행하는 함수 (에디터가 열린다)
  const onCreateManual = () => {
    setOpen(true);
  };

  //문제 추가 버튼 렌더함수
  const renderButton = () => {
    return (
      <StyledButton className="btn-primary" onClick={onCreateManual}>
        문제 추가
      </StyledButton>
    );
  };

  //모달창을 띄울 함수
  const onShowEdit = useCallback((record) => {
    setSelectedMlc(record);
    setOpen(true);
  }, []);

  //취소시 모달창을 닫을 함수
  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  //체크박스 부분 선택
  const onChange = (list) => {
    setCheckedList(list);
  };

  //체크박스 전체선택
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const renderTitle = () => {
    return (
      <div className="ant-modal-title" style={{ color: "white" }}>
        문제 추가
      </div>
    );
  };

  return (
    <StyledExBankContentPanel>
      <ContentPannel pathInfo={"문제항목 관리"} renderButton={renderButton}>
        <div className="ex-type-check">
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
            style={{
              width: 100,
              marginRight: 17,
              borderRight: "2px solid #efefef",
            }}
          >
            전체 선택
          </Checkbox>
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        </div>
        <List
          mlList={_mList}
          pageSize={pageSize}
          onShowEdit={onShowEdit}
          checkedList={checkedList}
        />
        <AntModal
          open={isOpen}
          title={renderTitle()}
          onCancel={onCancel}
          autoHeight
          footer={false}
          destroyOnClose
        >
          <EditQuestion
            exDataList={exDataList}
            onSelectTreeNode={onSelectTreeNode}
            selectNodeId={selectNodeId}
          />
        </AntModal>
      </ContentPannel>
    </StyledExBankContentPanel>
  );
};

export default ExBankContentPanel;
