import styled from 'styled-components';

const StyledBzCenterPanel = styled.div`
  height: 100vh;

  .bz-tab {
  }
  .bz-content {
    overflow-y: scroll;
    width: 100%;
    height: calc(100vh - 100px);
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
`;

export default StyledBzCenterPanel;
