import styled from 'styled-components';

const StyeldETestTree = styled.div`
  .e-test-header {
    width: 100%;
    height: 50px;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tree-header {
    height: 50px;
    background-color: #d9d9d9;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: space-between;
  }

  .tree-panel {
    padding: 10px;
    height: calc(100vh - 110px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ant-tree-title {
    white-space: nowrap;
  }
`;

export default StyeldETestTree;
