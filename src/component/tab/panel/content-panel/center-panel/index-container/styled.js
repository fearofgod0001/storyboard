import styled from "styled-components";
export const StyledIndexPanel = styled.div`
  .toc-1 .content-title {
    .ant-input {
      font-weight: 600;
    }
  }

  .toc-2 .content-title {
    .ant-input {
      margin-top: 3px;
      font-weight: 600;
    }
  }

  .toc-panel {
    > input {
      margin-top: 2px;
      line-height: 0px;
      background-color: transparent;
      border-width: 0px;
      border-radius: 0px;
      line-height: 0px;
      border: 0px;
      background-color: transparent;
      padding: 0px 5px;
    }
    > input:hover {
      border-color: #4096ff;
      border-width: 0px;
    }

    > input:focus {
      border-width: 0px;
      border: 0px;
      border-color: #57a8e9;
      outline: 0;
      -webkit-box-shadow: 0 0 0 0px rgba(87, 168, 233, 0.2);
      box-shadow: 0 0 0 0px rgba(87, 168, 233, 0.2);
    }
  }

  margin-top: 5px;
  .content-title {
    display: flex;
    align-items: center;
    height: 40px;

    .ant-input-affix-wrapper {
      margin-top: 2px;
      padding: 4px 0px;
      line-height: 0px;
      background-color: transparent;
      border-width: 0px;
      border-radius: 0px;
      line-height: 0px;
      border: 0px;
      > input {
        background-color: transparent;
        padding: 0px 5px;
      }
    }

    .ant-input-affix-wrapper-focused {
      border-width: 0px;
      border: 0px;
      border-color: #57a8e9;
      outline: 0;
      -webkit-box-shadow: 0 0 0 0px rgba(87, 168, 233, 0.2);
      box-shadow: 0 0 0 0px rgba(87, 168, 233, 0.2);
    }

    .ant-input-affix-wrapper:hover {
      border-color: #4096ff;
      border-width: 0px;
    }

    .ant-input-affix-wrapper:focus-within {
      border: 0px;
      border-color: transparent;
      box-shadow: 0px;
      -webkit-box-shadow: 0px;
      outline: 0;
    }
  }

  .toc-1 {
    .content-title {
      border-top: 1px solid #076dac;
      background-color: #eef8fe;

      .ant-input-affix-wrapper {
        margin-top: 2px;
        > input {
          font-weight: 600;
        }
      }
    }
  }

  .toc-2 {
    .content-title {
      .ant-input-affix-wrapper {
        margin-top: 3px;
        > input {
          font-weight: 600;
        }
      }
    }
  }
`;
