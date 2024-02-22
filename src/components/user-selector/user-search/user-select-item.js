import React, { useEffect, useRef } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Checkbox } from 'antd';
import { TeamOutlined, UserSwitchOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { ItemTypes } from '../itemTypes';
import { useDrag, useDrop } from 'react-dnd';
import { StyledUserItem } from './user-item-styled';

export const UserSelectItem = ({ user, fixedUsers, id, index, activeType, onUserSort, onRemoveUser, onSelectUser }) => {
  const ref = useRef(null);
  const [{ item, handlerId }, drop] = useDrop({
    accept: ItemTypes.USER,

    collect(monitor) {
      return {
        item: monitor.getItem(),
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;

      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onUserSort(dragIndex, hoverIndex, item);
      item.index = hoverIndex;
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, []);

  const [, drag, preview] = useDrag(() => ({
    type: ItemTypes.USER,
    item: { type: activeType, index, id, user },

    collect: (monitor) => {
      return { isDragging: monitor.isDragging() };
    },
  }));

  const opacity = index === item?.index && activeType === 'userselect' ? 0 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="user-item" data-handler-id={handlerId}>
      <StyledUserItem>
        <div className="user-checkbox">
          <Checkbox checked={user.checked} onChange={(e) => onSelectUser(e.target.checked, user.USER_ID)} />
        </div>
        <div className="user">
          <div className="user-info">
            <div>
              <UserSwitchOutlined style={{ marginRight: '5px' }} />
              {user.USER_NM} / {user.EMP_NO} / {user.PSTN_NM}
            </div>
            <div>
              {!fixedUsers.includes(user.USER_ID) && (
                <CloseSquareOutlined style={{ fontSize: '16px' }} onClick={() => onRemoveUser([user.USER_ID])} />
              )}
            </div>
          </div>

          <div className="dept-info">
            <div>
              {user.DEPT_ID?.length > 0 &&
                user.DEPT_ID?.map((dept, i) => {
                  return (
                    <div key={`dept${i}`}>
                      <TeamOutlined style={{ marginRight: '5px' }} />
                      {dept.DEPT_NM} {dept.DUTY_NM !== ' ' && `[${dept.DUTY_NM}]`}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </StyledUserItem>
    </div>
  );
};
