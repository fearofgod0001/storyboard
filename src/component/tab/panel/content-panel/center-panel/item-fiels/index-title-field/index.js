import { Input } from 'antd';
import { useEffect, useState } from 'react';
import IndexNumbringField from '../index-numbering-field';
import { StyledIndexTitle } from './styled';

const IndexTitleField = ({ initValue, onEdit, onChangeTitle, numberingList, item }) => {
  const [_value, setValue] = useState(initValue);

  useEffect(() => {
    if (initValue !== _value) {
      setValue(initValue);
    }
  }, [initValue]);

  useEffect(() => {
    if (_value) {
      onChangeTitle(_value);
    }
  }, [_value]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <StyledIndexTitle>
      <div className="index-panel">
        <IndexNumbringField numberingList={numberingList} item={item} />
        <Input onChange={onChange} placeholder="목차명을 입력해 주세요" value={_value} />
      </div>
    </StyledIndexTitle>
  );
};

export default IndexTitleField;
