import { InputNumber } from 'antd';

export const FormInputNumberField = ({ value, onChange, min, max, width, size }) => {
  return <InputNumber min={min} max={max} onChange={onChange} style={{ width }} value={value} size={size} />;
};
