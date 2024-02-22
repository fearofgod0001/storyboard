import { DatePicker } from 'antd';

export const FormDatePickerField = ({ onChange, value }) => {
  // const _onChange = (date, dateString) => {
  //   console.debug('FormDatePickerField date', date);
  //   console.debug('FormDatePickerField dateString', dateString);
  //   onChange(date);
  // };

  return <DatePicker style={{ width: 180 }} onChange={onChange} value={value} />;
};
