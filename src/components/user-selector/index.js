import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import { useMutation, useQuery } from 'react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DeptTree } from './dept-tree';
import { UserSearch } from './user-search/user-search';
import { UserSelectPanel } from './user-search/user-select-panel';
import { selectdeptlist } from '@/services/portal/dept';
import { selectAllDeptId, selectUserName } from '@/services/portal/user';
import { StyledCompLayer } from '@/components/styledElement';

export const UserSelector = ({ initUserList, onSelectedUser, fixedUsers = [] }) => {
  const [userList, setUserList] = useState([]);
  const [selectUserList, setSelectUserList] = useState([]);

  useEffect(() => {
    initUserList && setSelectUserList([...initUserList]);
  }, [initUserList]);

  const { data: tree } = useQuery('selectdeptlist', selectdeptlist);
  const {
    mutate: mutateSelectAllDeptId,
    isLoading: isLoadingSelectAllDeptId,
    isSuccess: isSuccessSelectAllDeptId,
    data: selectAllDeptIdData,
  } = useMutation('selectAllDeptId', (data) => selectAllDeptId(data));

  useEffect(() => {
    if (isSuccessSelectAllDeptId) {
      if (selectAllDeptIdData?.list) {
        setUserList(selectAllDeptIdData.list);
      }
    }
  }, [isSuccessSelectAllDeptId, selectAllDeptIdData]);

  const onSelectTreeNode = (idx, deptInfo) => {
    if (isLoadingSelectAllDeptId) return;

    const { node } = deptInfo;
    mutateSelectAllDeptId(node.userData);
  };

  const {
    mutate: mutateSelectUserName,
    isLoading: isLoadingSelectUserName,
    isSuccess: isSuccessSelectUserName,
    data: selectUserNameData,
  } = useMutation('selectUserName', (data) => selectUserName(data));

  useEffect(() => {
    if (isSuccessSelectUserName) {
      if (selectUserNameData?.list) {
        setUserList(selectUserNameData.list);
      }
    }
  }, [isSuccessSelectUserName, selectUserNameData]);

  const onSearchUser = (e) => {
    if (isLoadingSelectUserName) return;
    mutateSelectUserName({ USER_NAME: e.target.value });
  };

  const onUserMove = useCallback((user) => {
    if (!user) return;
    setSelectUserList((prev) => {
      const pos = prev.findIndex((f) => f?.USER_ID === user?.USER_ID);
      if (pos === -1) {
        return update(prev, { $push: [{ ...user, checked: false }] });
      }
      return update(prev, { $set: prev });
    });
  }, []);

  const onUserSort = (dragIndex, hoverIndex, item) => {
    setSelectUserList((prev) => {
      const { user } = item;
      if (!user || !prev) return;
      const pos = prev.findIndex((f) => f?.USER_ID === user?.USER_ID);
      if (item.type === 'user') {
        if (pos === -1) {
          return update(prev, {
            $splice: [[hoverIndex, 0, { ...user }]],
          });
        }
      }
      return update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      });
    });
  };

  const onRemoveUser = (userList) => {
    setSelectUserList((prev) => {
      const filterList = prev.filter((f) => !userList.includes(f.USER_ID));
      return filterList;
    });
  };

  const onSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectUserList((prev) => {
      return prev.map((user) => ({ ...user, checked: checked }));
    });
  };

  const onSelectRemove = (userList) => {
    const removeList = userList.filter((f) => f.checked).map((user) => user.USER_ID);
    onRemoveUser(removeList);
  };

  const onSelectUser = (checked, userId) => {
    setSelectUserList((prev) => {
      return prev.map((user) => (user.USER_ID === userId ? { ...user, checked: checked } : { ...user }));
    });
  };

  const onRollbackMove = (user) => {
    if (!user) return;
    setSelectUserList((prev) => {
      const nUserList = [...prev];
      const pos = prev.findIndex((f) => f?.USER_ID === user?.USER_ID);
      if (pos > -1) {
        nUserList.splice(pos, 1);
        return [...nUserList];
      }
      return [...prev];
    });
  };

  return (
    <StyledCompLayer>
      <div className="user-selector">
        <div className="left-pan">
          <DeptTree treeData={tree?.list} onSelectTreeNode={onSelectTreeNode} />
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className="center-pan">
            <UserSearch
              userList={userList}
              onSearchUser={onSearchUser}
              selectUserList={selectUserList?.map((user) => user.USER_ID)}
              onUserMove={onUserMove}
              onRollbackMove={onRollbackMove}
            />
          </div>
          <div className="right-pan">
            <UserSelectPanel
              selectUserList={selectUserList}
              onUserSort={onUserSort}
              onSelectAll={onSelectAll}
              onSelectUser={onSelectUser}
              onRemoveUser={onRemoveUser}
              onSelectRemove={onSelectRemove}
              onComplete={onSelectedUser}
              fixedUsers={fixedUsers}
            />
          </div>
        </DndProvider>
      </div>
    </StyledCompLayer>
  );
};

export default UserSelector;
