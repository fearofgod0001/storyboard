import styled from "styled-components";

const StyledWrapTree = styled.div`
  height: calc(100vh - 130px);
  .tree-header {
    height: 50px;
    background-color: #efefef;
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

  .comfirm-panel {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .tree-body {
    overflow: auto;
    height: calc(100vh - 162px);
  }

  .tree {
    margin: 0 10px;
    .rc-tree-treenode {
      display: flex;
      align-items: center;

      .rc-tree-node-content-wrapper {
        display: flex;
        align-items: center;
      }
    }

    .rc-tree-title {
      display: inline-block;
      font-size: 14px;
    }

    .rc-tree-treenode:hover {
      background-color: #efefef;
    }
  }
`;

export default StyledWrapTree;
