import { useEffect, useState } from 'react';
import { Input, Radio, InputNumber } from 'antd';
import update from 'immutability-helper';

const ItemMcList = ({ mcqAns, value, onChange, pageMode, onChangeMcaAns }) => {
  const [itemArr, setItemArr] = useState([]);

  //value값이 들어올 때 itemArr값을 변경하도록 바꿔준다
  useEffect(() => {
    if (value) {
      setItemArr(value);
    }
  }, [value]);

  //itemArr 초기값인 빈배열이 onChnage로 들어가는 것을 방지한다
  useEffect(() => {
    if (itemArr.length > 0) {
      if (JSON.stringify(itemArr) !== JSON.stringify(value)) {
        onChange(itemArr);
      }
    }
  }, [itemArr, value]);

  const onChangeItemTitle = (e, index) => {
    setItemArr((prev) => {
      return update(prev, { $splice: [[index, 1, e.target.value]] });
    });
  };

  const renderRadioButtons = () => {
    return Array.from({ length: itemArr?.length }, (_, index) => (
      <div key={index + 1} style={{ marginTop: 10 }}>
        <Radio value={index + 1} disabled={pageMode === 'V'}>
          {index + 1}.
          <Input
            value={itemArr && itemArr[index]}
            onChange={(e) => onChangeItemTitle(e, index)}
            style={{
              width: 380,
              height: 28,
              marginLeft: 10,
            }}
            disabled={pageMode === 'V'}
          />
        </Radio>
      </div>
    ));
  };

  const onChangeRadio = (item) => {
    onChangeMcaAns(item.target.value);
  };

  //입력 숫자(cnt)에 따라 배열의 길이를 수정하는 함수
  const onChangeInputNum = (cnt) => {
    if (cnt) {
      setItemArr((prev) => {
        const curLeng = prev?.length;
        if (cnt > curLeng) {
          //새로운 배열의 값을 만들어서 넣어준다
          const itemsToAdd = Array(cnt - curLeng).fill();
          return update(prev, { $push: itemsToAdd });
        } else if (cnt < curLeng) {
          if (mcqAns > cnt) {
            onChangeMcaAns(null);
          }
          return update(prev, { $splice: [[cnt, 1]] });
        }
      });
    }
  };

  return (
    <>
      <Radio.Group onChange={onChangeRadio} value={mcqAns}>
        {renderRadioButtons()}
      </Radio.Group>
      {pageMode !== 'V' && (
        <InputNumber
          min={1}
          max={5}
          defaultValue={itemArr.length}
          onChange={onChangeInputNum}
          style={{ marginTop: 10, width: '100%' }}
          disabled={pageMode === 'V'}
        />
      )}
    </>
  );
};

export default ItemMcList;
