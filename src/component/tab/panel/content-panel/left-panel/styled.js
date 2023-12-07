import styled from "styled-components";

const StyledLeftPanel = styled.div`
  height: 100vh;
  .header {
    height: 50px;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    position: relative;

    .plus {
      position: absolute;
      font-size: 25px;
      right: 16px;
      cursor: pointer;
    }
  }

  .tree-panel {
    height: calc(100vh - 100px);
    overflow: auto;
  }

  .toc {
    scrollbar-width: 5px;

    overflow-x: hidden !important;
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #efefef;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #9f9d9d;
    }
  }

  .no-scrollbars::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export default StyledLeftPanel;
