import { DatePicker } from 'antd';
import StyledDateField from './styled';

const DateField = ({}) => {
  const onChange = (date, dateString) => {
    console.debug(date, dateString);
  };

  return (
    <StyledDateField>
      <div className="title">시작일</div>
      <div className="separator"></div>
      <DatePicker style={{ width: 180 }} onChange={onChange} />
    </StyledDateField>
  );
};

export default DateField;
