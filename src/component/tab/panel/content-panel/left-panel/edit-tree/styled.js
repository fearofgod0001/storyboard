import styled from "styled-components";

const StyledTree = (Component) => styled(Component)`
  margin: 10px;
  .ant-tree-node-content-wrapper {
    border: 1px solid #bfbfbf;
    border-radius: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .ant-tree-node-content-wrapper-normal {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .ant-tree-title {
    white-space: nowrap;
  }
  .treeTitle {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default StyledTree;
