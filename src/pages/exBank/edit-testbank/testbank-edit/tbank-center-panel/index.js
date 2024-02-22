import { TitleField } from '@/components/form-fields';
import { Form } from 'antd';
import StyledTbankCenterPanel from './styled';
import ExItemList from './ex-item-list';

const TbankCenterPanel = ({ exColumn, exTreeData, isOpenSelectItem, onHandleSelectItem }) => {
  return (
    <StyledTbankCenterPanel>
      <div className="cpanel-title">
        <Form.Item
          noStyle
          name="EX_TEST_TITLE"
          rules={[
            {
              required: true,
              message: '시험 제목을 입력해주세요',
            },
          ]}
        >
          <TitleField placeholder="시험명을 입력해주세요" />
        </Form.Item>
      </div>
      <div className="test-item">
        <div className="item-column">
          <Form.Item
            noStyle
            name="EX_TEST_DATA"
            rules={[
              {
                required: true,
                message: '시험문제를 입력해주세요',
              },
            ]}
          >
            <ExItemList
              exTreeData={exTreeData}
              isOpenSelectItem={isOpenSelectItem}
              onHandleSelectItem={onHandleSelectItem}
            />
          </Form.Item>
        </div>
      </div>
    </StyledTbankCenterPanel>
  );
};

export default TbankCenterPanel;
