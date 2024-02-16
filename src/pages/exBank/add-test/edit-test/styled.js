import styled from 'styled-components';

const StyledEditEtest = styled.div`
  .create-classify-data {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .create-ex-title {
    display: flex;
    margin-bottom: 10px;
  }
  .create-ex-format {
    display: flex;
    margin-bottom: 10px;
  }

  .ex-header {
    width: 100px;
    display: flex;
    margin-right: 5px;
    align-items: center;
  }
  .test-item-setting {
    width: 100%;
    height: 37px;
    font-weight: bolder;
    margin-top: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #060056;
    color: white;
  }
  .submit-btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }
  .ant-input-number,
  .ant-input-number-input {
    background-color: white;
    cursor: default;
    color: #000;
  }

  .ant-input[disabled] {
    color: initial;
    background-color: inherit;
    border-color: #d9d9d9;
    box-shadow: none;
    cursor: initial;
    opacity: 1;
  }
  .ant-input[disabled]:hover {
    border-color: inherit;
    background-color: inherit;
  }

  .ant-select-disabled:where(.css-dev-only-do-not-override-2i2tap).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: #000;
    background-color: white;
    cursor: default;
  }
  .ant-radio-input[disabled] {
    cursor: default;
  }
`;

export default StyledEditEtest;
