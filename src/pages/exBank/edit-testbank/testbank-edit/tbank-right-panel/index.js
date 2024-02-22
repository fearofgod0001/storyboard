import { Form } from 'antd';
import { DatePickerField, InitSelectField, InputNumberField } from '@/components/form-fields';

import StyledTbankRightPanel from './styled';
import { ApplyField } from './apply-field';

const init = [
  {
    value: 1,
    label: '하나',
  },
  {
    value: 2,
    label: '둘',
  },
];
const TbankRightPanel = ({ pageMode, onHandleColumn }) => {
  return (
    <StyledTbankRightPanel>
      <div className="rpanel-head"> 기본정보 </div>
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
          <DatePickerField />
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
          <InputNumberField min={1} max={300} width={180} />
        </Form.Item>
      </div>
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
          <InitSelectField init={init} onHandleColumn={onHandleColumn} />
        </Form.Item>
      </div>
      <div className="rpanel-apply">
        <Form.Item noStyle name="EX_TEST_CANDIDATE">
          <ApplyField fieldValue={init} pageMode={pageMode} />
        </Form.Item>
      </div>
    </StyledTbankRightPanel>
  );
};

export default TbankRightPanel;
