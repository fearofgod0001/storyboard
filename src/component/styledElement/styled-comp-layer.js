import styled from "styled-components";

const StyledLayer = styled.div`
  .user-selector {
    font-size: 13px;
    display: flex;
    .left-pan {
      width: 350px;

      .tree-header {
        display: flex;
        align-items: center;
        padding-left: 15px;
        font-size: 14px;
        font-weight: 600;
        height: 50px;
        background-color: #efefef;
      }

      .tree-body {
        height: 520px;
        overflow: auto;
      }

      .ant-segmented-lg {
        width: 100%;
        background-color: #efefef;
      }

      .tree {
        margin: 10px;
        .rc-tree-title {
          margin-left: 5px;
        }
      }
    }

    .center-pan {
      border-left: 1px solid #cdcdcd;
      border-right: 1px solid #cdcdcd;
      width: 350px;
      .user-title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        height: 50px;
        padding: 0px 10px;
        background-color: #efefef;
      }

      .user-list {
        height: 560px;
        overflow: auto;

        .user-item {
          cursor: move;
          display: flex;
          line-height: 30px;
          align-items: center;
          .user-checkbox {
            width: 30px;
          }

          .user-info {
            display: flex;
            align-items: center;
            font-weight: 600;
            color: #0039ab;
            font-size: 12px;
          }
        }

        .org-user-info {
          font-size: 12px;
          border-bottom: 1px solid #efefef;
          line-height: 30px;
          padding: 5px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .org-user-info:hover {
          font-size: 12px;
          cursor: move;
          background-color: #efefef;
          border-bottom: 1px solid #efefef;
          line-height: 30px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .right-pan {
      .result-header {
        padding-left: 15px;
        width: 350px;
        height: 50px;
        background-color: #efefef;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .result-pannel {
        padding: 10px;

        min-height: 500px;
        .result-user-header {
          display: flex;
          justify-content: space-between;
        }

        .user-select-pannel {
          min-height: 50px;
          font-size: 12px;

          .org-user-info {
            border-bottom: 1px solid #efefef;
            line-height: 30px;
            overflow: hidden;
            width: 300px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .org-user-info:hover {
            cursor: move;
            background-color: #efefef;
          }
        }
      }

      .user-result {
        height: 490px;
        overflow-y: auto;
        padding: 15px;
      }
    }
  }
`;

export default StyledLayer;
