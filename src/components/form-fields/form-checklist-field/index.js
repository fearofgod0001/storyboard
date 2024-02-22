import { useState } from 'react';
import { Checkbox } from 'antd';
import StyledFormChkListField from './styled';

const plainOptions = [
  { label: '객관식', value: 'MCQ' },
  { label: '주관식', value: 'SAQ' },
];
const defaultCheckedList = ['MCQ', 'SAQ'];

export const FormChkListField = ({ onChangeTestType }) => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const CheckboxGroup = Checkbox.Group;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  //체크박스 전체선택
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? defaultCheckedList : []);
    onChangeTestType(e.target.checked ? defaultCheckedList : []);
  };

  //체크박스 부분 선택
  const onChangeCheckList = (list) => {
    setCheckedList(list);
    onChangeTestType(list);
  };

  return (
    <StyledFormChkListField>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        style={{
          width: 100,
          marginRight: 17,
          borderRight: '2px solid #efefef',
        }}
      >
        전체 선택
      </Checkbox>
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChangeCheckList} />
    </StyledFormChkListField>
  );
};
