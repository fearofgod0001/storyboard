import styled from "styled-components";

export const StyledContent = styled.div`
  display: flex;
  margin-top: 2px;
  .left-panel {
    width: 300px;
  }
  .center-panel {
    display: block;
    width: calc(100vw - 600px);
    overflow-y: scroll;
    height: calc(100vh - 50px);
  }

  .right-panel {
    width: 300px;
    border: 1px solid #efefef;
  }
`;
