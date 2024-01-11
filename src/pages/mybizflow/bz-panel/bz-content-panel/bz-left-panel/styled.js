import styled from 'styled-components';

const StyledBzLeftPanel = styled.div`
  height: 100vh;
  .header {
    width: 100%;
    height: 50px;
    background-color: #f8f8f8;
    border-bottom: 2px solid #cacaca;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bz-component-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 0 5px 0;
    .bz-component-item {
      width: 90%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #c1c1c1;
      margin-bottom: 5px;
      border-radius: 3px;
      &:hover {
        background-color: #f6f6f6;
      }
    }
  }
`;

export default StyledBzLeftPanel;
