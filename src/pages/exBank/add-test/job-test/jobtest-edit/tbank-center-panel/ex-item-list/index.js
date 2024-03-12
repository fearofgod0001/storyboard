import { useDrop } from 'react-dnd';
import { useEffect, useState } from 'react';
import { StyledModal } from '@/components/styledElement';
import { Button, Empty, Modal, message, Skeleton, Form } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ExItem from './ex-item';
import AddExItem from './add-ex-item';
import update from 'immutability-helper';

const AntModal = StyledModal(Modal);

const ExItemList = ({ value, onChange, action, pageMode, exTreeData, isOpenSelectItem, onHandleSelectItem }) => {
  const [exItemList, setExItemList] = useState([]);
  const [isOpenAddModal, setOpenAddModal] = useState();
  const [ttlScore, setTtlScore] = useState(0);

  //시험지의 초기 value를 넣는 함수
  useEffect(() => {
    if (value) {
      if (JSON.stringify(value) !== JSON.stringify(exItemList)) {
        setExItemList(value);
      }

      const totalScore = value.reduce((acc, item) => acc + (item?.EX_SCORE ?? 0), 0);
      setTtlScore(totalScore);
    }
  }, [value]);

  //시험문제 list가 변경되면 onChange실행
  useEffect(() => {
    if (exItemList)
      if (JSON.stringify(exItemList) !== JSON.stringify(value)) {
        onChange(exItemList);
      }
  }, [exItemList]);

  const onHandleItemAddModal = () => {
    setOpenAddModal(true);
  };

  const onCancelItemAddModal = () => {
    setOpenAddModal(false);
  };

  //시험지 문제를 추가하는 함수
  const _onAddTestItem = (item, _index) => {
    if (item) {
      //중복 여부 체크
      const exist = exItemList.some((f) => f.EX_IDX === item.EX_IDX);
      if (!exist) {
        //index값이 있으면 그 다음 칸에 문제를 추가
        if (_index) {
          setExItemList((prev) => {
            return update(prev, {
              $splice: [[_index, 0, item]],
            });
          });
          //index값이 없으면 맨 뒤에 문제를 추가
        } else {
          setExItemList((prev) => {
            return update(prev, {
              $splice: [[exItemList.length, 0, item]],
            });
          });
        }
        onHandleSelectItem(false);
      } else {
        message.error('동일한 문제가 존재합니다.');
      }
    }
  };

  //시험지 문제를 삭제하는 함수
  const _onRemoveTestItem = (index, exIdx) => {
    setExItemList((prev) => {
      return update(prev, {
        $splice: [[index, 1]],
      });
    });
  };

  //react dnd드래그 완료
  const [{ isOver }, dropLeft] = useDrop({
    accept: 'field',
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      const isOverMonitor = monitor.isOver();
      if (isOverMonitor) {
        _onAddTestItem(item);
      }
    },
  });

  //beautiful dnd 드래그 완료
  const _onDragEnd = (result) => {
    const { source } = result;
    const { destination } = result;

    if (!destination) {
      return;
    }

    setExItemList((prev) => {
      return update(prev, {
        $splice: [
          [source.index, 1],
          [destination.index, 0, { ...prev[source.index] }],
        ],
      });
    });
  };

  //문제 점수를 저장하는 함수
  const onChangeScore = (e, index) => {
    setExItemList((prev) => {
      return update(prev, {
        $splice: [[index, 1, { ...prev[index], EX_SCORE: e }]],
      });
    });
  };

  return (
    <>
      <div className="ttl-score"> 총점 : {ttlScore}</div>
      <div ref={dropLeft}>
        <DragDropContext onDragEnd={_onDragEnd}>
          <Droppable key="exItemList" droppableId="exItemList">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.droppableProps}>
                {value &&
                  value.map((item, i) => {
                    const { EX_IDX } = item || {};

                    return (
                      <Draggable
                        key={`exItem-${EX_IDX}-${i}`}
                        index={i}
                        draggableId={`exItem-${EX_IDX}-${i}`}
                        isDragDisabled={pageMode === 'V'}
                      >
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Form.Item noStyle name="EX_USER_ANSWER">
                              <ExItem
                                action={action}
                                key={`${item.EX_IDX}`}
                                item={item}
                                index={i}
                                pageMode={pageMode}
                                onChangeScore={onChangeScore}
                                onAddTestItem={_onAddTestItem}
                                onRemoveTestItem={_onRemoveTestItem}
                              />
                            </Form.Item>
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
        {isOver && (
          <div className="dummy-test-item">
            <div className="question">
              <div className="ques-icon">{value.length + 1}.</div>
              <Skeleton active style={{ marginLeft: 15, width: '50%' }} />
            </div>
          </div>
        )}

        {['N', 'M'].includes(pageMode) && (
          <>
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
                onAddTestItem={_onAddTestItem}
                isOpenSelectItem={isOpenSelectItem}
                onHandleSelectItem={onHandleSelectItem}
              />
            </AntModal>
          </>
        )}
        <div style={{ width: '100%', height: 1 }}></div>
      </div>
    </>
  );
};

export default ExItemList;
