import styled from 'styled-components';
export const StyledPanel = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  margin: 11px;
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 80px;
    font-weight: 600;
    text-align: center;
  }
  .separator {
    width: 1px;
    height: 20px;
    background-color: #efefef;
    margin: 0px 15px;
  }

  @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }

  .warning {
    font-weight: 600;
    color: #ff000e;
    animation: blink-effect 1s step-end infinite;
    background-color: #efefef;
    border-radius: 8px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .manager-panel {
    display: block;
    line-height: 25px;
    .userInfo {
      width: 170px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .dept {
        padding-left: 5px;
      }
    }
  }
`;

export const StyledApplyField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  .row {
    display: flex;
    flex-direction: column;
    .row-label {
      display: flex;
      padding: 5px;
    }
    .row-content {
      padding: 5px;

      .item {
        display: flex;
        height: 25px;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
      }

      .item-dept {
        padding: 5px;
      }

      .item-group {
        padding: 5px;
      }

      .user-name {
        width: 100%;
        white-space: nowrap;
        /* overflow: hidden; */
        text-overflow: ellipsis;
        padding: 5px;
      }

      .dept-name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 20px;
      }

      .empty {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export default StyledApplyField;
