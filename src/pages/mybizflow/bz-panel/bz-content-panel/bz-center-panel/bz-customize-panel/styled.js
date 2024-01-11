import styled from "styled-components";

const StyledBzCustomizePanel = styled.div`
  .react-grid-layout {
    min-height: 330px;
    position: relative;
    transition: height 200ms ease;
  }
  .testMemo {
    /* width: 250px;
    height: 250px; */
    background-color: #fff6cf;
    border: 1px solid #f0e8c3;

    .react-resizable-handle::after {
      z-index: 60;
      content: "";
      position: absolute;
      right: -6px;
      bottom: -6px;
      width: 10px;
      height: 10px;
      border-right: 3px solid rgba(0, 0, 0, 0.8);
      border-bottom: 3px solid rgba(0, 0, 0, 0.8);
    }
  }
`;

export default StyledBzCustomizePanel;
