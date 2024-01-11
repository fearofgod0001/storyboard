import styled from "styled-components";

export const StyledDiffPanel = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4491e0;
  }
  &::-webkit-scrollbar-track {
    background-color: #dee1e6;
  }

  .diff-modal-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333333;
    color: white;
    padding: 0 20px 0 20px;
    font-weight: bolder;
    .diff-modal-close {
      color: white;
    }
  }
  .content-header {
    height: 42px;
    display: flex;
    padding: 9px 0 0 0;
    .diff-select {
      width: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px 10px 25px;
      .diff-select-title {
        font-size: 13px;
      }
    }
  }

  .diff-modal-body {
    padding: 0 30px 0 30px;

    .content-body {
      margin-bottom: 5px;
      .diff-content-1 {
        .diff-title-left {
          width: 50%;
          display: flex;
          align-items: center;
          height: 40px;
          border-top: 1px solid #076dac;
          background-color: #eef8fe;
          font-weight: bold;
          border-right: 1px solid #f1f1f1;
          del {
            display: none;
          }
          ins {
            color: #000;
            background-color: rgba(29, 201, 183, 0.3);
            text-decoration: none;
          }
        }
        .diff-title-right {
          width: 50%;
          display: flex;
          align-items: center;
          height: 40px;
          border-top: 1px solid #ccc;
          background-color: #f2f2f2;
          font-weight: bold;
          del {
            color: #000;
            background-color: rgba(255, 0, 0, 0.1);
            text-decoration: none;
          }
          ins {
            display: none;
          }
        }
      }
      .diff-title {
        display: flex;
        width: 100%;
      }
      .diff-title-left {
        width: 50%;
        display: flex;
        align-items: center;
        height: 30px;
        font-weight: bold;

        border-right: 1px solid #f1f1f1;
        del {
          display: none;
        }
        ins {
          color: #000;
          background-color: rgba(29, 201, 183, 0.3);
          text-decoration: none;
        }
      }
      .diff-title-right {
        width: 50%;
        display: flex;
        align-items: center;
        height: 30px;
        font-weight: bold;
        del {
          color: #000;
          background-color: rgba(255, 0, 0, 0.1);
          text-decoration: none;
        }
        ins {
          display: none;
        }
      }
    }
    .diff-body {
      display: flex;
    }
  }
`;
