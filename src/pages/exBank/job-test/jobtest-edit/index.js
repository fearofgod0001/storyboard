import StyledTestBankEdit from './styled';
import TbankCenterPanel from './tbank-center-panel';
import TbankLeftPanel from './tbank-left-panel';
import TbankRightPanel from './tbank-right-panel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Form, Input } from 'antd';
const JobTestEdit = ({
  form,
  action,
  pageMode,
  onFinish,
  exColumn,
  exTreeData,
  onFinishFailed,
  onHandleColumn,
  isOpenSelectItem,
  onHandleSelectItem,
}) => {
  return (
    <StyledTestBankEdit>
      <DndProvider backend={HTML5Backend}>
        {['M', 'N'].includes(pageMode) && (
          <div className="tbank-left-panel">
            <TbankLeftPanel exColumn={exColumn} exTreeData={exTreeData} />
          </div>
        )}
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
          <Form.Item name="EX_TEST_TYPE" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="USER_START_DATE" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="USER_END_DATE" hidden>
            <Input />
          </Form.Item>
          <div className="tbank-center-panel">
            <TbankCenterPanel
              form={form}
              onFinish={onFinish}
              action={action}
              pageMode={pageMode}
              exColumn={exColumn}
              exTreeData={exTreeData}
              isOpenSelectItem={isOpenSelectItem}
              onHandleSelectItem={onHandleSelectItem}
            />
          </div>
          {['M', 'N'].includes(pageMode) && (
            <div className="tbank-right-panel">
              <TbankRightPanel pageMode={pageMode} onHandleColumn={onHandleColumn} />
            </div>
          )}
        </Form>
      </DndProvider>
    </StyledTestBankEdit>
  );
};

export default JobTestEdit;
