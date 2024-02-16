import { Input } from 'antd';

const { TextArea } = Input;

export const FormTextAreaField = ({ value, onChange, pageMode }) => {
  return (
    <TextArea
      value={value}
      onChange={onChange}
      style={{
        resize: 'none',
        height: 80,
        backgroundColor: 'white',
      }}
      disabled={pageMode === 'V'}
    />
  );
};
