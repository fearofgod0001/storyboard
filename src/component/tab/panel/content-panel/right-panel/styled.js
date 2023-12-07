import styled from "styled-components";

const StyledRightPanel = styled.div`
  .header {
    height: 50px;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
  }
  .options {
    margin: 5px;

    .option-item {
      margin: 10px;
    }

    .option-item-nomargin {
      margin: 0px;
    }
  }
`;

export default StyledRightPanel;
