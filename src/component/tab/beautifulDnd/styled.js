import styled from "styled-components";

export const StyledRayTab = styled.div`
  width: 100%;
  height: 42px;
  display: flex;

  .hoverTopBorder {
    height: 2px;
    &:hover {
      height: 0px;
      border: 1px solid black;
    }
  }
  .tabItemPlus {
    min-width: 50px;
    margin-left: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }

  .horizontal-tabs-container {
    display: flex;
  }
`;
