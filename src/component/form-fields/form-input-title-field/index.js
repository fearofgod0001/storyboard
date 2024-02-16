import { Input } from 'antd';
import { useState } from 'react';
import StyledTitleField from './styled';

export const FormTitleField = ({ placeholder }) => {
  const [value, setValue] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <StyledTitleField>
      <div className="title" style={{ display: 'relatve' }}>
        <Input key="formTitle" placeholder={placeholder} value={value} onChange={onChange} />
      </div>
    </StyledTitleField>
  );
};
