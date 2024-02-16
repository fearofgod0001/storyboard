import styled from 'styled-components';

const StyledApplyField = styled.div`
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
        overflow: hidden;
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
