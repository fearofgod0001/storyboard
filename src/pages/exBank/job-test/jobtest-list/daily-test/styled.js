import styled from 'styled-components';

const StyledDailyTest = styled.div`
  padding: 10px;

  .ant-picker-calendar-date-value {
    color: ${(props) => (props.isWeekend ? 'red' : 'inherit')};
  }
  .events {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default StyledDailyTest;
