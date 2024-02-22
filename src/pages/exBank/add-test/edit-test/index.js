import { Form, message, Input, Popconfirm } from "antd";
import StyledButton from "@/components/styledElement/styled-button";
import StyledEditEtest from "./styled";
import EClassifyField from "./e-classify-field";
import ETypeField from "./e-type-field";
import ETitleField from "./e-title-field";
import ETestItem from "./e-test-item";

const EditTest = ({
  form,
  testType,
  pageMode,
  onFinish,
  selectedEx,
  exTreeData,
  onChangeAction,
  onChangePageMode,
  onSelectTreeNode,
  onChangeETestType,
}) => {
  const onFinishFailed = ({ __, errorFields }) => {
    message.error(
      errorFields.map((err, i) =>
        i === 0 ? err.errors : <div>{err.errors}</div>
      )
    );
  };

  return (
    <StyledEditEtest>
      <Form
        name="frm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="EX_IDX" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          noStyle
          name="CODE_ID"
          rules={[
            {
              required: true,
              message: "분류체계를 설정해주세요",
            },
          ]}
        >
          <EClassifyField
            pageMode={pageMode}
            treeData={exTreeData}
            onSelectTreeNode={onSelectTreeNode}
          />
        </Form.Item>
        <Form.Item
          noStyle
          name="EX_TYPE"
          rules={[
            {
              required: true,
              message: "시험 타입을 설정해주세요",
            },
          ]}
        >
          <ETypeField
            pageMode={pageMode}
            onChangeETestType={onChangeETestType}
          />
        </Form.Item>
        <Form.Item
          noStyle
          name="EX_TITLE"
          rules={[
            {
              required: true,
              message: "문제 제목을 설정해주세요",
            },
          ]}
        >
          <ETitleField pageMode={pageMode} />
        </Form.Item>
        {pageMode === "N" && <div className="test-item-setting">문제 설정</div>}
        {testType && (
          <Form.Item
            noStyle
            name="EX_DATA"
            rules={[
              {
                required: true,
                message: "문제 내용을 입력해주세요",
              },
            ]}
          >
            <ETestItem
              testType={testType}
              pageMode={pageMode}
              selectedEx={selectedEx}
            />
          </Form.Item>
        )}
      </Form>

      {pageMode === "N" && (
        <div className="submit-btn">
          <StyledButton
            className="btn-primary btn-xs"
            onClick={(e) => {
              form.submit();
              onFinish();
            }}
          >
            적용
          </StyledButton>
        </div>
      )}
      {pageMode === "V" && (
        <div className="submit-btn">
          <StyledButton
            className="btn-primary btn-xs"
            onClick={(e) => {
              onChangePageMode("N");
              onChangeAction("M");
            }}
          >
            수정
          </StyledButton>

          <Popconfirm
            title="삭제하시겠습니까?"
            placement="rightTop"
            onConfirm={() => onChangeAction("D")}
            okText="Yes"
            cancelText="No"
          >
            <StyledButton className="btn-primary btn-xs">삭제</StyledButton>
          </Popconfirm>
        </div>
      )}
    </StyledEditEtest>
  );
};

export default EditTest;
