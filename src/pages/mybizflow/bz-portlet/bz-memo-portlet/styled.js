import styled from "styled-components";

const StyledBzMemoPortlet = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff6cf;
  border: 1px solid #f0e8c3;
  border-radius: 10px;
  box-shadow: 1px 1px 12px #efefef;
  .memo-header {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff2ab;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  .memo-content {
    overflow-y: scroll;
    height: calc(100% - 41px);
    margin: 6px 0 6px 5px;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #b5ac79;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(255, 255, 255, 0);
    }
  }
`;

export default StyledBzMemoPortlet;
