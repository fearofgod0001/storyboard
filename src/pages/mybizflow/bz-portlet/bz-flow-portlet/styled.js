import styled from 'styled-components';

const StyledBzFlowPortlet = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #f1f1f1;
  box-shadow: 1px 1px 12px #efefef;
  border-radius: 10px;
  .flow-header {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    background-color: #f9f9f9;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  .flow-content {
    overflow-y: scroll;
    height: calc(100% - 41px);
    display: flex;
    flex-wrap: wrap;
    margin: 6px 0 6px 5px;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #e1e1e1;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(255, 255, 255, 0);
    }
    .flow-item-container {
      width: 320px;
      height: 300px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 11px 10px 11px;
      .flow-item {
        border: 1px solid #cfcfcf;
        width: 280px;
        height: 300px;
      }
      .flow-arrow {
        border: 1px solid #efefef;
        border-radius: 6px;
        box-shadow: 1px 1px 3px #efefef;
        width: 40px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: -32px;
      }
    }
  }
`;

export default StyledBzFlowPortlet;
