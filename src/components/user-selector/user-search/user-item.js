import React, { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { TeamOutlined, UserSwitchOutlined } from '@ant-design/icons';

import { ItemTypes } from '../itemTypes';
import { StyledUserItem } from './user-item-styled';

export const UserItem = ({ user, idx, activeType, onUserMove, onRollbackMove }) => {
  const [{ isDragging }, drag, preview] = useDrag(() => {
    if (user.type === 'user') {
      return;
    }
    return {
      type: ItemTypes.USER,
      item: { type: activeType, user },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (!dropResult) {
          onRollbackMove(item.user);
        }
        if (item && dropResult) {
          onUserMove(item.user);
        }
      },
      collect: (monitor) => {
        return { isDragging: monitor.isDragging() };
      },
    };
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, []);

  const opacity = isDragging ? 0.2 : 1;

  return (
    <>
      <div ref={drag} style={{ opacity }} className="user-item">
        <StyledUserItem>
          <div className="user-checkbox">{/* <Checkbox /> */}</div>
          <div className="user">
            <div className="user-info">
              <div>
                <UserSwitchOutlined style={{ marginRight: '5px' }} />
                {user.USER_NM} / {user.EMP_NO} / {user.PSTN_NM}
              </div>
            </div>
            {/* {user.DEPT_INFO?.length > 0 &&
              user.DEPT_INFO?.map((dept, i) => {
                return (
                  <div key={`dept${i}`}>
                    <TeamOutlined style={{ marginRight: '5px' }} />
                    {dept.DEPT_NM} {dept.DUTY_NM !== ' ' && `[${dept.DUTY_NM}]`}
                  </div>
                );
              })} */}
          </div>
        </StyledUserItem>
      </div>
    </>
  );
};
