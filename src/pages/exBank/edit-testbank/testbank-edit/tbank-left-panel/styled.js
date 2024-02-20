import styled from 'styled-components';

const StyledTbankLeftPanel = styled.div`
  height: 100%;
  .lpanel-head {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    background-color: #f8f8f8;
  }

  .lpanel-search {
    margin: 8px 5px;
    .lpanel-chklist {
      margin: 0 0 5px 0;
      display: flex;
      justify-content: center;

      span {
        font-size: 13px;
        padding-inline-end: 2px;
      }
    }
  }
  .tree-search {
    margin: 3px;
  }
  .tree-select {
    margin: 3px;
  }
  .ex-list {
    margin: 3px;
  }
  .lpanel-set-layout {
  }
`;

export default StyledTbankLeftPanel;
