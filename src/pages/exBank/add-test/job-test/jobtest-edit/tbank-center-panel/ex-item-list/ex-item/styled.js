import styled from 'styled-components';

export const StyledExItem = styled.div`
  width: 100%;
  min-height: 185px;
  margin: 12px 0;
  background-color: #f7f7f7;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .score {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 14px;
    right: 14px;
    .score-title {
      font-size: 13px;
      font-weight: 600;
      margin-right: 5px;
    }
    .delete-btn {
      margin-left: 4px;
      cursor: pointer;
    }
  }

  .item-data {
    .question {
      display: flex;
      margin: 5px 130px 3px 14px;
      .ques-icon {
        font-size: 30px;
        font-weight: 600;
      }
      .ques-content {
        font-size: 20px;
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
    }
    .mcq {
      margin-left: 25px;
      .radio-item {
        margin-left: 5px;
      }
    }
  }
  .user-answer {
    .answer-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      background-color: #efefef;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .ant-input-number-disabled {
    background-color: inherit;
    color: #000;
  }
  .ant-input-number-input {
    cursor: default;
  }
`;

export const StyledDummyExItem = styled.div`
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
`;
