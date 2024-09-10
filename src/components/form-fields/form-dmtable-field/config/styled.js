import styled from 'styled-components';
export const StyledList = styled.div`
  .item-header {
    display: flex;
  }
  .item {
    display: flex;
  }
`;

export const StyledConfig = styled.div`
  .item {
    display: flex;
    align-items: center;
    min-height: 40px;

    .label {
      width: 120px;
      text-align: left;
    }

    &.unline {
      border-bottom: 1px solid #efefef;
      padding: 5px 20px 5px;
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
    margin-left: 30px;
  }

  .size-wrap {
    display: flex;
    justify-content: center;
    .size-panel {
      width: 912px;
      border: 1px solid #efefef;
      display: flex;
      align-items: center;

      .dm-panel {
        margin: 10px;
        max-width: 881px;
        overflow-x: auto;
      }
    }
  }
`;
