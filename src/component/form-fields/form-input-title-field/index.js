import { Input } from 'antd';
import StyledTitleField from './styled';

export const FormTitleField = ({ onChange, value, placeholder }) => {
  return (
    <StyledTitleField>
      <div className="title" style={{ display: 'relatve' }}>
        <Input key="formTitle" placeholder={placeholder} value={value} onChange={onChange} />
      </div>
    </StyledTitleField>
  );
};
