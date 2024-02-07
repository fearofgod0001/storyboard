import { useState, useCallback } from "react";
import { ContentPannel } from "../../../component/panel";
import StyledButton from "../../../component/styledElement/styled-button";
import StyledModal from "../../../component/styledElement/styled-modal";
import { Modal, Checkbox, Form, message } from "antd";
import StyledExBankContentPanel from "./styled";
import update from "immutability-helper";
import List from "./list";
import EditQuestion from "./edit-question";

const AntModal = StyledModal(Modal);

const plainOptions = ["객관식", "주관식"];
const defaultCheckedList = ["객관식", "주관식"];

const ExBankContentPanel = ({
  exDataList,
  onSelectTreeNode,
  selectNodeId,
  onSubmit,
  mList,
}) => {
  const [form] = Form.useForm();
  const [_mList, setMlist] = useState(mList);
  const [_exDataList, setExDataList] = useState(exDataList);
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
    form.resetFields();
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

  const onFinish = (info) => {
    console.debug("onFinish", info);
    if (info) {
      setMlist((prev) => {
        return update(prev, {
          $push: [{ ...info, RNUM: prev.length + 1, REG_USER_NM: "관리자" }],
        });
      });
    }
  };

  const onFinishFailed = ({ __, errorFields }) => {
    message.error(
      errorFields.map((err, i) =>
        i === 0 ? err.errors : <div>{err.errors}</div>
      )
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
        <div className="ex-search"></div>

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
          height="100%"
        >
          <Form
            name="frm"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <EditQuestion
              exDataList={_exDataList}
              onSelectTreeNode={onSelectTreeNode}
              selectNodeId={selectNodeId}
              onSubmit={onSubmit}
              onFinish={onFinish}
              form={form}
            />
          </Form>
        </AntModal>
      </ContentPannel>
    </StyledExBankContentPanel>
  );
};

export default ExBankContentPanel;
