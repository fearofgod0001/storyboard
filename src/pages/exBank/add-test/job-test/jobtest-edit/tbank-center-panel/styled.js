import styled from 'styled-components';

const StyledTbankCenterPanel = styled.div`
  padding: 0 12px;
  .cpanel-title {
    margin: 10px 5px;
  }
  .test-item {
    display: flex;
    height: calc(100vh - 150px);
    overflow-y: scroll;
    padding-right: 5px;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #4491e0;
    }
    &::-webkit-scrollbar-track {
      background-color: #dee1e6;
    }
  }
  .item-column {
    width: 100%;
  }
  .empty-item {
    background-color: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    border-radius: 10px;
  }

  .dummy-test-item {
    width: 100%;
    min-height: 150px;
    margin: 12px 0;
    background-color: #f7f7f7;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0.5;
    .question {
      display: flex;
      margin: 5px 109px 3px 14px;
      .ques-icon {
        font-size: 30px;
        font-weight: 600;
      }
    }
  }
  .ttl-score {
    display: flex;
    justify-content: flex-end;
    font-size: 15px;
    font-weight: 600;
  }
`;

export default StyledTbankCenterPanel;
