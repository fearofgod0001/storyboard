import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Popconfirm, Tooltip } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import StyledLayoutFIeld from './styled';

const LayoutField = ({ exColumn, exItemList, onChangeEnd, onRemoveTestItem }) => {
  const [_itemList, setItemlist] = useState();

  useEffect(() => {
    if (exItemList) {
      if (JSON.stringify(exItemList) !== JSON.stringify(_itemList)) {
        setItemlist(exItemList);
      }
    }
  }, [_itemList, exItemList]);

  return (
    <StyledLayoutFIeld>
      <div className="layout-title">레이아웃 설정</div>

      <DragDropContext onDragEnd={onChangeEnd}>
        <Droppable key="exItemList" droppableId="exItemList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.droppableProps}>
              <div className="layout-content">
                {_itemList &&
                  _itemList.map((item, i) => {
                    const { EX_DATA, EX_IDX } = item || {};
                    return (
                      <Draggable key={`exItem-${EX_IDX}-${i}`} index={i} draggableId={`exItem-${EX_IDX}-${i}`}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className="exitem">
                              <div className="exitem-header">
                                <Tooltip placement="right" title={EX_DATA?.EX_DESCRIP}>
                                  <div className="exitem-title">
                                    {i + 1}. {EX_DATA?.EX_DESCRIP}
                                  </div>
                                </Tooltip>

                                <Popconfirm
                                  title="삭제하시겠습니까?"
                                  placement="bottom"
                                  onConfirm={() => onRemoveTestItem(i, EX_IDX)}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <div className="delete-btn">
                                    <CloseOutlined />
                                  </div>
                                </Popconfirm>
                              </div>

                              <div className="exitem-content">
                                <div className="dummy1"></div>
                                <div className="dummy1"></div>
                                <div className="dummy2"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StyledLayoutFIeld>
  );
};

export default LayoutField;
