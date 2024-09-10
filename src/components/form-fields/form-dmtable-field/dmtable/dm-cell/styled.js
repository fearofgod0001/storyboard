import styled from 'styled-components';

const StyledDmCell = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  .ant-input-disabled {
    cursor: default;
    background-color: #fff !important;
  }
  .ant-checkbox-wrapper-disabled {
    cursor: default;
    .ant-checkbox-inner {
      background-color: #fff !important;
      &:after {
        border-color: rgba(0, 0, 0, 1) !important;
      }
    }
    .ant-checkbox-inner {
    }
  }
  .row-handler {
    cursor: pointer;
  }
  .ant-input-disabled {
    color: #000;
  }
`;

export default StyledDmCell;
