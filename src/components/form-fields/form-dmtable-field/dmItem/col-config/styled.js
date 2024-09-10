import styled from 'styled-components';

export const StyledConfig = styled.div`
  display: flex;
  .item {
    align-items: center;
    min-height: 40px;

    .label {
      width: 120px;
      text-align: left;
    }

    &.unline {
      padding: 0px 0px 12px;
    }
  }

  .config-panel {
    padding: 10px;
    margin: 10px;
    border: 1px solid #c9c9c9;
    border-radius: 8px;
    background: #efefef;

    .config-item {
      display: flex;
      align-items: center;

      .config-label {
        width: 100px;
        text-align: center;
      }
    }
  }

  .size-title {
    height: 30px;
    display: flex;
    align-items: center;
    font-weight: 600;
    margin-left: 13px;
  }

  .size-wrap {
    display: flex;
    justify-content: center;
    margin: 0 20px;
    .size-panel {
      width: auto;
      border: 1px solid #efefef;
      display: flex;
      align-items: center;
      padding: 10px;

      .dm-panel {
      }
    }
  }
`;
