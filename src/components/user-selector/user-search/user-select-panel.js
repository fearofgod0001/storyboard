import React, { useCallback } from 'react';
import { ExportOutlined, DeleteOutlined } from '@ant-design/icons';
import { Checkbox, Empty } from 'antd';
import { useDrop } from 'react-dnd';

import { ItemTypes } from '../itemTypes';
import { UserSelectItem } from '../user-search/user-select-item';
import { StyledButton } from '@/components/styledElement';

export const UserSelectPanel = ({
  selectUserList,
  fixedUsers,
  onUserSort,
  onRemoveUser,
  onSelectUser,
  onSelectAll,
  onSelectRemove,
  onComplete,
}) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.USER,

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  console.debug('selectUserList', selectUserList);

  const renderUser = useCallback(
    (user, index, fixedUsers) => {
      return (
        user && (
          <UserSelectItem
            key={`${user.USER_ID}_${index}`}
            activeType="userselect"
            index={index}
            id={index}
            user={user}
            fixedUsers={fixedUsers}
            onUserSort={onUserSort}
            onRemoveUser={onRemoveUser}
            onSelectUser={onSelectUser}
          />
        )
      );
    },
    [onRemoveUser, onSelectUser, onUserSort]
  );

  return (
    <>
      <div className="result-header">
        <div>
          <div>
            <Checkbox style={{ paddingRight: '10px' }} onClick={onSelectAll} />
            선택된 사용자
          </div>
        </div>

        <div>
          <StyledButton className="btn-primary btn-xs mr5" onClick={() => onSelectRemove(selectUserList)}>
            <DeleteOutlined />
            선택삭제
          </StyledButton>
          <StyledButton className="btn-green btn-xs mr15" onClick={() => onComplete(selectUserList)}>
            <ExportOutlined />
            적용
          </StyledButton>
        </div>
      </div>
      <div className="user-result" ref={drop}>
        {selectUserList && selectUserList.length > 0 ? (
          selectUserList.map((user, index) => renderUser(user, index, fixedUsers))
        ) : (
          <Empty description={<span>선택된 사용자가 없습니다.</span>} style={{ paddingTop: '100px' }} />
        )}
      </div>
    </>
  );
};
