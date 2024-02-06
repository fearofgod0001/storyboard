import styled from "styled-components";

const StyledMakeSaq = styled.div`
  margin-top: 10px;

  .ques-answer,
  .ques-items {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
  }

  .ans-title,
  .ques-title,
  .descrip-title {
    width: 100%;
    height: 30px;
    /* margin-top: 12px; */
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #ccc;
    background-color: #f3f3f3;
  }
`;

export default StyledMakeSaq;
