import styled from 'styled-components';

const StyledTestResult = styled.div`
  .result-title {
    font-size: 22px;
    font-weight: 600;
  }
  .test-info {
    margin: 10px;
    border-top: 3px solid #001295;
  }
  .test-title,
  .test-runtime,
  .test-start-date {
    display: flex;
    width: 100%;
  }
  .test-seperate {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }
  .head {
    background-color: #efefef;
    color: #333;
    font-size: 12px;
    font-weight: 600;
    padding: 10px;
    display: flex;
    justify-content: center;
    width: 160px;
  }
  .content {
    background: #ffffff;
    padding: 10px;
    color: #666;
    font-size: 12px;
  }
`;

export default StyledTestResult;
