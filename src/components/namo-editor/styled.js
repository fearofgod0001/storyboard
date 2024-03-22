import styled from "styled-components";

const StyledNamoEditor = styled.div`
  iframe {
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #121212;
    }
    &::-webkit-scrollbar-track {
      background-color: #dee1e6;
    }
  }
  .header {
    width: 30%;
    display: flex;
    flex-direction: column;
  }
`;

export default StyledNamoEditor;
