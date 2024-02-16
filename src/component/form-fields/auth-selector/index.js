import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { SelectOutlined, TeamOutlined, UserOutlined, GroupOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Styled } from './styled';
import { StyledButton, StyledModal } from '@/components/styledElement';
import Organization from '@/components/organization';
const AntModal = StyledModal(Modal);

export const AuthSelector = ({ value, onChange, pageMode, fieldTitle = '설정현황' }) => {
  const [isOpen, setOpen] = useState(false);
  const onShowModal = (open) => {
    setOpen(open);
  };

  const onApply = (resultSet) => {
    onChange(resultSet);
    onShowModal(false);
  };

  const onCancel = () => {
    onShowModal(false);
  };

  return (
    <Styled>
      <div className="title">
        <div>
          <SelectOutlined style={{ paddingRight: '5px' }} />
          {fieldTitle}
        </div>
        <div>
          {pageMode !== 'V' && (
            <StyledButton
              className="btn-primary btn-xs"
              onClick={(e) => {
                e.preventDefault();
                onShowModal(true);
              }}
            >
              설정
            </StyledButton>
          )}
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="row-label">
            <TeamOutlined style={{ paddingRight: '5px' }} />
            부서
          </div>
          <div className="row-content">
            {value && value?.deptList && value?.deptList.length > 0 ? (
              value.deptList.map((dept, i) => (
                <div key={i} className="item">
                  <TeamOutlined style={{ paddingRight: '5px' }} />
                  {dept.DEPT_NM}
                </div>
              ))
            ) : (
              <span className="item">No Data</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="row-label">
            <GroupOutlined style={{ paddingRight: '5px' }} />
            그룹
          </div>
          <div className="row-content">
            {value?.groupList && value?.groupList.length > 0 ? (
              value?.groupList.map((group, i) => (
                <div key={i} className="item">
                  <GroupOutlined style={{ paddingRight: '5px' }} />
                  {group.CODE_NM}
                </div>
              ))
            ) : (
              <span className="item">No Data</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="row-label">
            <UserOutlined style={{ paddingRight: '5px' }} />
            사용자
          </div>
          <div className="row-content">
            {value && value?.userList && value?.userList.length > 0 ? (
              value?.userList.map((user, i) => (
                <div key={i} className="item">
                  <div className="user-name">
                    <UserSwitchOutlined style={{ paddingRight: '10px' }} />
                    {user?.USER_NM}[{user?.PSTN_NM}]
                  </div>
                  <div className="dept-name">
                    {user?.DEPT_INFO.map((dept, i) => (
                      <span key={i} style={{ paddingLeft: '10px' }}>
                        <TeamOutlined />
                        {dept?.DEPT_NM}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <span className="item">No Data</span>
            )}
          </div>
        </div>
      </div>
      <AntModal
        bodyStyle={{ padding: '0px' }}
        style={{ top: '10px' }}
        title={'접속 권한설정'}
        onCancel={onCancel}
        width={1050}
        open={isOpen}
        footer={[]}
        destroyOnClose
      >
        <Organization initResultSet={value} onApply={onApply} />
      </AntModal>
    </Styled>
  );
};
