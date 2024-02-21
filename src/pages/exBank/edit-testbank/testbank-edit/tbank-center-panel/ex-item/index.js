import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TextAreaField } from '@/components/form-fields';
import { Radio, Popconfirm } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { InputNumberField } from '@/components/form-fields';

import StyledExItem from './styled';
import McqItemField from './mcq-item-field';

const ExItem = ({ onChange, vlaue, item, index, onRemoveTestItem }) => {
  const { EX_DATA, EX_IDX } = item || {};

  const onChangeRadio = (e) => {
    console.debug('onChangeRadio', e.target.value);
  };

  const [{ isOver }, dropLeft] = useDrop({
    accept: 'field',
    canDrop: () => item.EX_DATA !== null,
    hover(dragItem, monitor) {},
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <StyledExItem ref={dropLeft}>
      <div className="score">
        <div className="score-title">배점 </div>
        <div className="score-input">
          <InputNumberField min={1} max={100} width={55} size="small" />
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
  );
};

export default ExItem;
