import { useEffect, useState } from 'react';
import { StyledModal } from '@/components/styledElement';
import { TitleField } from '@/components/form-fields';
import { Button, Empty, Modal, Form } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import StyledTbankCenterPanel from './styled';
import ExItem from './ex-item';
import AddExItem from './add-ex-item';

const AntModal = StyledModal(Modal);

const TbankCenterPanel = ({
  exColumn,
  onDragEnd,
  exTreeData,
  exItemList,
  onAddTestItem,
  isOpenSelectItem,
  onRemoveTestItem,
  onHandleSelectItem,
}) => {
  const [_exItemList, setExItemList] = useState();
  const [isOpenAddModal, setOpenAddModal] = useState();

  useEffect(() => {
    if (exItemList) {
      setExItemList(exItemList);
    }
  }, [exItemList]);

  const onHandleItemAddModal = () => {
    setOpenAddModal(true);
  };

  const onCancelItemAddModal = () => {
    setOpenAddModal(false);
  };

  return (
    <StyledTbankCenterPanel>
      <div className="cpanel-title">
        <Form.Item
          noStyle
          name="EX_TEST_TITLE"
          rules={[
            {
              required: true,
              message: '시험 제목을 입력해주세요',
            },
          ]}
        >
          <TitleField placeholder="시험명을 입력해주세요" />
        </Form.Item>
      </div>
      <div className="test-item">
        <div className="item-column">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable key="exItemList" droppableId="exItemList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.droppableProps}>
                  {_exItemList &&
                    _exItemList.map((item, i) => {
                      const { EX_IDX } = item || {};
                      return (
                        <Draggable key={`exItem-${EX_IDX}-${i}`} index={i} draggableId={`exItem-${EX_IDX}-${i}`}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <ExItem
                                key={`${item.EX_IDX}`}
                                item={item}
                                index={i}
                                onRemoveTestItem={onRemoveTestItem}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="empty-item">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={false}
            >
              <Button type="primary" onClick={onHandleItemAddModal}>
                문제 추가
              </Button>
            </Empty>
          </div>
        </div>
      </div>

      <AntModal
        style={{ top: '65px' }}
        title={'문제 추가'}
        onCancel={onCancelItemAddModal}
        width={1100}
        open={isOpenAddModal}
        footer={false}
        destroyOnClose
      >
        <AddExItem
          exTreeData={exTreeData}
          onAddTestItem={onAddTestItem}
          isOpenSelectItem={isOpenSelectItem}
          onHandleSelectItem={onHandleSelectItem}
        />
      </AntModal>
    </StyledTbankCenterPanel>
  );
};

export default TbankCenterPanel;
