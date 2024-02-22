import React, { useState } from 'react';
import { Input, Empty } from 'antd';
import { UserItem } from './user-item';
import { UserDrag } from './user-drag';
export const UserSearch = ({ userList, selectUserList = [], onUserMove, onSearchUser, onRollbackMove }) => {
  const renderUser = (user, index, activeType) => {
    return (
      <UserItem
        key={user.USER_ID}
        user={user}
        index={index}
        activeType={activeType}
        onUserMove={onUserMove}
        onRollbackMove={onRollbackMove}
      />
    );
  };
  return (
    <>
      <div className="user-title">
        <Input.Search placeholder="사용자명으로 검색해주세요" onPressEnter={onSearchUser} allowClear />
      </div>
      <div className="user-list">
        {userList && userList.length > 0 ? (
          userList
            .filter((f) => !selectUserList.includes(f.USER_ID))
            .map((user, index) => renderUser(user, index, 'user'))
        ) : (
          <Empty description={<span>사용자를 검색해 주세요.</span>} style={{ paddingTop: '100px' }} />
        )}
      </div>
      <UserDrag />
    </>
  );
};
