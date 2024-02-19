import styled from 'styled-components';

const StyledTbankCenterPanel = styled.div`
  padding: 0 12px;
  .cpanel-title {
    margin: 10px 5px;
  }
  .test-item {
    display: flex;
    height: calc(100vh - 150px);
    overflow-y: scroll;
    padding-right: 5px;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #4491e0;
    }
    &::-webkit-scrollbar-track {
      background-color: #dee1e6;
    }
  }
  .item-column {
    width: 100%;
  }
  .empty-item {
    background-color: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    border-radius: 10px;
  }
`;

export default StyledTbankCenterPanel;
