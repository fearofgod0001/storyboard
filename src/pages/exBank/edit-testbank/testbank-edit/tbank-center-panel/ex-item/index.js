import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TextAreaField } from '@/components/form-fields';
import { Radio, Popconfirm } from 'antd';

import StyledExItem from './styled';
import InputNumberField from './score-field';
import McqItemField from './mcq-item-field';

const ExItem = ({ item, index, onRemoveTestItem }) => {
  const { EX_DATA, EX_IDX } = item || {};

  console.debug('ExItem', item);

  const onChangeScore = (value) => {
    console.debug('onChangeScore', value);
  };

  const onChangeRadio = (e) => {
    console.debug('onChangeRadio', e.target.value);
  };

  return (
    <StyledExItem>
      <div className="score">
        <div className="score-title">배점 </div>
        <div className="score-input">
          <InputNumberField onChange={onChangeScore} />
        </div>
        <div className="delete-">
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
