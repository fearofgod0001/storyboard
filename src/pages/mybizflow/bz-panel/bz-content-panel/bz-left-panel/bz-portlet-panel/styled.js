import styled from "styled-components";

const StyledBzPortletPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
`;

export default StyledBzPortletPanel;
