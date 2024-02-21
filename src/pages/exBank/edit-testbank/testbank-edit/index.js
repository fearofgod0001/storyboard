import StyledTestBankEdit from './styled';
import TbankCenterPanel from './tbank-center-panel';
import TbankLeftPanel from './tbank-left-panel';
import TbankRightPanel from './tbank-right-panel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Form, Input } from 'antd';
const TestBankEdit = ({
  form,
  pageMode,
  onFinish,
  exColumn,
  onDragEnd,
  exTreeData,
  exItemList,
  onAddTestItem,
  onFinishFailed,
  onHandleColumn,
  isOpenSelectItem,
  onRemoveTestItem,
  onHandleSelectItem,
}) => {
  return (
    <StyledTestBankEdit>
      <DndProvider backend={HTML5Backend}>
        <div className="tbank-left-panel">
          <TbankLeftPanel
            exColumn={exColumn}
            onDragEnd={onDragEnd}
            exTreeData={exTreeData}
            exItemList={exItemList}
            onAddTestItem={onAddTestItem}
            onRemoveTestItem={onRemoveTestItem}
          />
        </div>
        <Form
          name="frm"
          form={form}
          layout="inline"
          style={{ width: '100%', flexWrap: 'nowrap' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="EX_TEST_IDX" hidden>
            <Input />
          </Form.Item>
          <div className="tbank-center-panel">
            <TbankCenterPanel
              exColumn={exColumn}
              onDragEnd={onDragEnd}
              exTreeData={exTreeData}
              exItemList={exItemList}
              onAddTestItem={onAddTestItem}
              onRemoveTestItem={onRemoveTestItem}
              isOpenSelectItem={isOpenSelectItem}
              onHandleSelectItem={onHandleSelectItem}
            />
          </div>
          <div className="tbank-right-panel">
            <TbankRightPanel pageMode={pageMode} onHandleColumn={onHandleColumn} />
          </div>
        </Form>
      </DndProvider>
    </StyledTestBankEdit>
  );
};

export default TestBankEdit;
