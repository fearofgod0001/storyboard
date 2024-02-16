import { Input } from 'antd';

export const FormInputDefaultField = ({ value, onChange, pageMode }) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      style={{
        height: 36,
      }}
      disabled={pageMode === 'V'}
    />
  );
};
