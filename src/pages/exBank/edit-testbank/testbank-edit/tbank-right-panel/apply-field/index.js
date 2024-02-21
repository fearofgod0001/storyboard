import { useState, useCallback, useRef } from 'react';
import { StyledCard } from './styled-card';
import { StyledModal } from '@/components';
import { Card, Modal, Empty } from 'antd';
import { TeamOutlined, UserSwitchOutlined, UserOutlined } from '@ant-design/icons';
import { StyledPanel, StyledApplyField } from './styled';
import UserSelector from '@/components/user-selector';

const AntCard = StyledCard(Card);

const AntModal = StyledModal(Modal);

const ManagerInfoView = ({ fieldValue }) => {
  return (
    <StyledPanel>
      <div className="title">담당자</div>
      <div className="separator" />
      <div className="manager-panel">
        {fieldValue &&
          fieldValue.map((manager) => {
            const { DEPT_INFO: deptInfo } = manager;
            const mgrDept = deptInfo?.find((f) => f.IS_PRIMARY === '1');
            return (
              <div className="userInfo">
                <div className="user">
                  <UserOutlined style={{ marginRight: '2px' }} />
                  {manager?.USER_NM}
                </div>
                <div className="dept">({mgrDept?.DEPT_NM})</div>
              </div>
            );
          })}
      </div>
    </StyledPanel>
  );
};

export const ApplyField = ({ value: fieldValue, onChange, pageMode }) => {
  const [isOpenCard, setIsOpenCard] = useState();
  const preValue = useRef(fieldValue);

  const onSelectedUser = useCallback(
    (resultSet) => {
      const isChange = JSON.stringify(preValue.current) !== JSON.stringify(resultSet);
      if (isChange) {
        onChange(resultSet);
        setIsOpenCard(false);
      }
    },
    [onChange]
  );

  const onCancel = () => {
    setIsOpenCard(false);
  };

  return ['V', 'R'].includes(pageMode) ? (
    <ManagerInfoView fieldValue={fieldValue} />
  ) : (
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
        style={{ top: '70px' }}
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
