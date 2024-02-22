import React from 'react';
import { useDragLayer } from 'react-dnd';
import { StyledUserDrag } from './user-drag-styled';
import { Checkbox } from 'antd';
import { TeamOutlined, UserSwitchOutlined } from '@ant-design/icons';

const layerStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
};

function getItemStyles(currentOffset, initialSourceOffset, item) {
  if (!currentOffset || !initialSourceOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;
  const { x: sx } = initialSourceOffset;
  const diff = item.type === 'user' ? 0 : 350;
  x = x - sx + 200 + diff;
  y -= 80;

  const transform = `translate(${x}px, ${y}px)`;
  // const transform = `translate(943px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    display: 'absolute',
    justifyContent: 'center',
  };
}

export const UserDrag = () => {
  const { isDragging, item, initialSourceOffset, currentOffset } = useDragLayer((monitor) => {
    return {
      item: monitor.getItem(),
      initialSourceOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    };
  });

  if (!isDragging) {
    return null;
  }

  const opacity = 0.5;

  return (
    <div style={{ ...layerStyles, opacity }}>
      <div style={{ ...getItemStyles(currentOffset, initialSourceOffset, item) }}>
        <StyledUserDrag>
          <div className="user-checkbox">
            <Checkbox />
          </div>
          <div className="user">
            {item.user?.DEPT_INFO?.length > 0 &&
              item.user?.DEPT_INFO?.map((dept, i) => {
                return (
                  <div key={i}>
                    <TeamOutlined style={{ marginRight: '5px' }} />
                    {dept.DEPT_NM} {dept.DUTY_NM !== ' ' && `[${dept.DUTY_NM}]`}
                  </div>
                );
              })}
            <div className="user-info">
              <UserSwitchOutlined style={{ marginRight: '5px' }} />
              {item?.user?.USER_NM} / {item?.user?.EMP_NO} / {item?.user?.PSTN_NM}
            </div>
          </div>
        </StyledUserDrag>
      </div>
    </div>
  );
};
