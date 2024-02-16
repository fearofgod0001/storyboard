import { useState, useCallback, useRef } from 'react';
import { StyledCard } from './styled-card';
import { Card, Modal, Empty } from 'antd';
import { StyledModal } from '@/components';
import { TeamOutlined, UserSwitchOutlined } from '@ant-design/icons';
import UserSelector from '@/components/user-selector';
import StyledApplyField from './styled';

const AntCard = StyledCard(Card);
const AntModal = StyledModal(Modal);

const ApplyField = ({ fieldValue }) => {
  const [isOpenCard, setIsOpenCard] = useState();
  const preValue = useRef(fieldValue);

  const onSelectedUser = useCallback(
    (resultSet) => {
      const isChange = fieldValue && JSON.stringify(preValue.current) !== JSON.stringify(resultSet);
      if (isChange) {
        // onChange(resultSet);
        setIsOpenCard(false);
      }
    },
    // [fieldValue, onChange]
    [fieldValue]
  );

  const onCancel = () => {
    setIsOpenCard(false);
  };
  return (
    <AntCard
      title="응시자"
      extra={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          onClick={(e) => {
            e.preventDefault();
            setIsOpenCard(true);
          }}
        >
          설정
        </a>
      }
    >
      <StyledApplyField>
        <div className="row">
          <div className="row-content">
            {fieldValue && fieldValue.length > 0 ? (
              fieldValue?.map((user, i) => (
                <div key={i} className="item">
                  <div className="user-name">
                    <UserSwitchOutlined style={{ paddingRight: '10px' }} />
                    {user?.USER_NM}[{user?.PSTN_NM}]
                  </div>
                  <div className="dept-name">
                    {user?.DEPT_INFO?.map((dept, i) => (
                      <span key={i} style={{ paddingLeft: '10px' }}>
                        <TeamOutlined />
                        {dept?.DEPT_NM}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
        </div>
      </StyledApplyField>
      <AntModal
        bodyStyle={{ padding: '0px' }}
        style={{ top: '10px' }}
        title={'담당자 설정'}
        onCancel={onCancel}
        width={1050}
        open={isOpenCard}
        footer={[]}
        destroyOnClose
      >
        <UserSelector onSelectedUser={onSelectedUser} initUserList={fieldValue} />
      </AntModal>
    </AntCard>
  );
};

export default ApplyField;
