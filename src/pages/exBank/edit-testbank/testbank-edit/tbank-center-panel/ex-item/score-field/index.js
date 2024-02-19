import { InputNumber } from 'antd';

const InputNumberField = ({ value, onChange }) => {
  return <InputNumber size="small" min={1} max={100} onChange={onChange} style={{ width: 55 }} />;
};

export default InputNumberField;
