import styled, { css } from "styled-components";

export const StyledRayDragTab = styled.div`
  min-width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* &:hover {
    border-top: 2px solid black;
  } */
  ${(props) =>
    props.active &&
    css`
      .hoverTopBorder {
        background-color: black;
      }
    `}
  .labelName {
    margin: 0 8px 0 17px;
  }
  .hoverTopBorder {
    height: 2px;
    &:hover {
      height: 0px;
      border: 1px solid black;
    }
  }

  .removeButton {
    margin: 0 17px 0 10px;
    border: none;
    background-color: none;
    font-size: 15px;
    font-weight: bolder;
    color: gray;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }

  .dragTabZone {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .hoverTopBorder {
      height: 2px;
      width: 100%;
    }
    &:hover {
      .hoverTopBorder {
        background-color: black;
      }
    }
  }
`;
