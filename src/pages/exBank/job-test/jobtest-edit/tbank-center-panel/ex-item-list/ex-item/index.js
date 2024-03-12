import { useDrop } from 'react-dnd';
import { CloseOutlined } from '@ant-design/icons';
import { TextAreaField } from '@/components/form-fields';
import { Radio, Popconfirm, Skeleton } from 'antd';
import { InputNumberField } from '@/components/form-fields';
import { StyledExItem, StyledDummyExItem } from './styled';

import McqItemField from './mcq-item-field';

const ExItem = ({ value, onChange, action, item, index, pageMode, onAddTestItem, onChangeScore, onRemoveTestItem }) => {
  const { EX_DATA, EX_IDX } = item || {};

  const [{ isOver }, drop] = useDrop({
    accept: 'field',
    canDrop: () => item.EX_DATA !== null,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
    drop: (_item, monitor) => {
      const isOverMonitor = monitor.isOver();
      if (isOverMonitor) {
        onAddTestItem(_item, index);
      }
    },
  });

  const onChangeAnswer = (e, i) => {
    onChange({ ...value, [EX_IDX]: e.target.value });
  };

  return (
    <div ref={drop}>
      {isOver && (
        <StyledDummyExItem>
          <div className="question">
            <div className="ques-icon">{index + 1}.</div>
            <Skeleton active style={{ marginLeft: 15, width: '50%' }} />
          </div>
        </StyledDummyExItem>
      )}
      <StyledExItem>
        <div className="score">
          <div className="score-title">배점 </div>
          <div className="score-input">
            <InputNumberField
              min={1}
              max={100}
              width={55}
              size="small"
              pageMode={pageMode}
              value={item.EX_SCORE}
              onChange={(e) => onChangeScore(e, index)}
            />
          </div>

          {['M', 'N'].includes(pageMode) && (
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
          )}
        </div>

        {EX_DATA && (
          <div>
            <div className="item-data">
              <div className="question">
                <div className="ques-icon">{index + 1}.</div>
                <div className="ques-content">{EX_DATA.EX_DESCRIP}</div>
              </div>
              <Radio.Group onChange={(e) => onChangeAnswer(e, index)} style={{ marginBottom: 20 }}>
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
            {pageMode === 'V' && action === 'S' && (
              <div className="user-answer">
                <div className="answer-title"> 정답</div>
                <TextAreaField
                  onChange={(e) => onChangeAnswer(e, index)}
                  value={value && value[EX_IDX]}
                  action={action}
                />
              </div>
            )}
          </div>
        )}
      </StyledExItem>
    </div>
  );
};

export default ExItem;
