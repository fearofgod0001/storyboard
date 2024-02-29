import { Form } from 'antd';
import { DatePickerField, InitSelectField, InputNumberField } from '@/components/form-fields';

import StyledTbankRightPanel from './styled';
import { ApplyField } from './apply-field';
import CountDownField from './coutdown-field';

const initColumn = [
  {
    value: 1,
    label: '일단',
  },
  {
    value: 2,
    label: '이단',
  },
];

const initStatus = [
  {
    value: 'H',
    label: '대기',
  },
  {
    value: 'E',
    label: '종료',
  },
  {
    value: 'S',
    label: '보류',
  },
];

const TbankRightPanel = ({ form, action, onFinish, pageMode, onHandleColumn }) => {
  return (
    <StyledTbankRightPanel>
      <div className="rpanel-head"> 시험 정보 </div>
      <div className="rpanel-start-date">
        <div className="title">시작일</div>
        <div className="separator"></div>
        <Form.Item
          noStyle
          name="EX_START_DATE"
          rules={[
            {
              required: true,
              message: '시작시간을 입력해주세요',
            },
          ]}
        >
          <DatePickerField pageMode={pageMode} />
        </Form.Item>
      </div>
      <div className="rpanel-runtime">
        <div className="title">소요시간(분)</div>
        <div className="separator"></div>
        <Form.Item
          noStyle
          name="EX_TEST_RUNTIME"
          rules={[
            {
              required: true,
              message: '소요시간을 입력해주세요',
            },
          ]}
        >
          <InputNumberField min={1} max={300} width={180} pageMode={pageMode} />
        </Form.Item>
      </div>
      {['M', 'N'].includes(pageMode) && (
        <div className="rpanel-col-setting">
          <div className="title">단설정</div>
          <div className="separator"></div>
          <Form.Item
            noStyle
            name="EX_TEST_COLUMN"
            rules={[
              {
                required: true,
                message: '단을 설정해주세요',
              },
            ]}
          >
            <InitSelectField init={initColumn} onHandleColumn={onHandleColumn} />
          </Form.Item>
        </div>
      )}
      {['M', 'N'].includes(pageMode) && (
        <div className="rpanel-status">
          <div className="title">상태</div>
          <div className="separator"></div>
          <Form.Item
            noStyle
            name="EX_TEST_STATUS"
            rules={[
              {
                required: true,
                message: '상태를 설정해주세요',
              },
            ]}
          >
            <InitSelectField init={initStatus} />
          </Form.Item>
        </div>
      )}
      {['M', 'N'].includes(pageMode) && (
        <div className="rpanel-apply">
          <Form.Item noStyle name="EX_TEST_CANDIDATE">
            <ApplyField pageMode={pageMode} />
          </Form.Item>
        </div>
      )}
      {action === 'S' && (
        <div className="rpanel-count-down">
          <div className="title">남은 시간</div>
          <div className="separator"></div>
          <CountDownField form={form} action={action} onFinish={onFinish} />
        </div>
      )}
    </StyledTbankRightPanel>
  );
};

export default TbankRightPanel;
