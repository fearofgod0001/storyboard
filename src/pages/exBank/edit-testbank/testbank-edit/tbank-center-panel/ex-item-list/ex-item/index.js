import { useDrop } from 'react-dnd';
import { CloseOutlined } from '@ant-design/icons';
import { TextAreaField } from '@/components/form-fields';
import { Radio, Popconfirm, Skeleton } from 'antd';
import { InputNumberField } from '@/components/form-fields';
import { StyledExItem, StyledDummyExItem } from './styled';

import McqItemField from './mcq-item-field';

const ExItem = ({ onChange, vlaue, item, index, onAddTestItem, onChangeScore, onRemoveTestItem }) => {
  const { EX_DATA, EX_IDX } = item || {};

  const onChangeRadio = (e) => {
    console.debug('onChangeRadio', e.target.value);
  };

  const [{ isOver }, dropLeft] = useDrop({
    accept: 'field',
    canDrop: () => item.EX_DATA !== null,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      const isOverMonitor = monitor.isOver();
      if (isOverMonitor) {
        onAddTestItem(item, index + 1);
      }
    },
  });

  return (
    <>
      <StyledExItem ref={dropLeft}>
        <div className="score">
          <div className="score-title">배점 </div>
          <div className="score-input">
            <InputNumberField min={1} max={100} width={55} size="small" onChange={(e) => onChangeScore(e, index)} />
          </div>

          <Popconfirm
            title="삭제하시겠습니까?"
            placement="bottom"
            onConfirm={() => onRemoveTestItem(index, EX_IDX)}
            okText="Yes"
            cancelText="No"
          >
            <div className="delete-btn">
              <CloseOutlined />
            </div>
          </Popconfirm>
        </div>

        {EX_DATA && (
          <div>
            <div className="item-data">
              <div className="question">
                <div className="ques-icon">{index + 1}.</div>
                <div className="ques-content">{EX_DATA.EX_DESCRIP}</div>
              </div>
              <Radio.Group onChange={onChangeRadio} style={{ marginBottom: 20 }}>
                {EX_DATA.EX_MCQ_LIST &&
                  EX_DATA.EX_MCQ_LIST.map((mcqItem, i) => {
                    return (
                      <div className="mcq">
                        <McqItemField index={i} item={mcqItem} />
                      </div>
                    );
                  })}
              </Radio.Group>
            </div>
            <div className="user-answer">
              <div className="answer-title"> 정답</div>
              <TextAreaField />
            </div>
          </div>
        )}
      </StyledExItem>
      {isOver && (
        <StyledDummyExItem>
          <div className="question">
            <div className="ques-icon">{index + 2}.</div>
            <Skeleton active style={{ marginLeft: 15, width: '50%' }} />
          </div>
        </StyledDummyExItem>
      )}
    </>
  );
};

export default ExItem;
