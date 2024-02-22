import styled from "styled-components";

const StyledMakeMcq = styled.div`
  margin-top: 10px;
  /* background-color: #f3f3f3; */

  .ques-items {
    width: 100%;
    margin: 5px 0 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ans-title,
  .item-title,
  .ques-title,
  .descrip-title {
    width: 100%;
    height: 30px;
    margin-top: 12px;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #ccc;
    background-color: #f3f3f3;
  }
  .ant-input-number-input-wrap {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export default StyledMakeMcq;
