import styled from "styled-components";

export const StyledIndexSectionTitle = styled.div`
  display: block;
  position: relative;
  width: 100%;
  font-style: normal;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  align-items: center;

  .content-title {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .title-view {
    color: #6d6d6d;
    width: 100%;
    font-size: 14px;
    color: rgb(51, 51, 51);
    border: 0px;
    background: transparent;
    outline: 0px;
    text-align: left;
    line-height: 1.21429em;
    padding: 14px 0px 14px 4px;
  }

  .buttons {
    position: absolute;
    right: 15px;
    cursor: pointer;
  }

  .index-panel {
    width: 100%;
    font-size: 14px;
    color: rgb(255 255 255);
    outline: 0px;
    text-align: left;
    line-height: 1.21429em;

    .ant-input:focus-within {
      border-color: #fff;
      box-shadow: 0 0 0 0px rgba(5, 145, 255, 0.1);
      outline: 0;
    }

    > input {
      margin: 5px;
      width: calc(100% - 40px);
      padding: 5px;
      flex: 1 0 auto;
      font-size: 14px;
      font-weight: 600;
      color: #1e13b7;
      border: 0px;
      background: transparent;
      outline: 0px;
      text-align: left;
      line-height: 1.21429em;
      transition: box-shadow 0.1s ease 0s, border-color 0.1s ease 0s;
    }

    .ant-input-affix-wrapper {
      border: 0px;
      // border-top: 0px;
      // border-left: 0px;
      // border-right: 0px;
      // border-bottom: 1px solid #d9d9d9;

      > input {
        margin: 0px;
        width: 100%;
        padding: 4px 0px 4px 4px;
        flex: 1 0 auto;
        font-size: 30px;
        color: rgb(51, 51, 51);
        border: 0px;
        background: transparent;
        outline: 0px;
        text-align: left;
        line-height: 1.21429em;
        transition: box-shadow 0.1s ease 0s, border-color 0.1s ease 0s;
      }
    }
  }

  .feedback-wrap {
    display: flex;
    font-size: 13px;
    color: #999999;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .ant-input-disabled {
    background-color: #ffffff;
  }
`;
