import styled from "styled-components";

const StyledWrapApp = styled.div`
  overflow: hidden;
  height: calc(100vh - 40px);
  .app-Path {
    font-weight: 600;
    background-color: #f8f8f878;
    border-bottom: 1px solid #d9d9d9;
    color: #000;
    height: 50px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
  }

  .path-Info {
    display: -webkit-box;
  }

  .btn-Wrap {
    display: flex;
  }

  .app-Wrap {
    margin: 0px;
    padding: 0 10px 0px 0px;
    overflow: auto;
    height: calc(100vh - 92px);
  }

  .app-content-wrap {
    overflow-y: auto;
    height: calc(100vh - 150px);
  }

  .search-panel {
    padding: 10px;
  }

  .pagination {
    text-align: center;
  }
`;

export default StyledWrapApp;
