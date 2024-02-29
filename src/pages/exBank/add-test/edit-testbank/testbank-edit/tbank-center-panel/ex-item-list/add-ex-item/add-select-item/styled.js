import styled from 'styled-components';

const StyledAddSelectItem = styled.div`
  .descrip-title {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .descrip-content {
    margin-left: 5px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selectitem-mcq {
    margin: 10px;
  }

  .ans-title,
  .explain-title {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: bolder;
    background-color: #f1f1f1;
  }

  .ans-content,
  .explain-content {
    padding: 5px;
  }
  .footer {
    margin-top: 5px;
    display: flex;
    justify-content: flex-end;
  }
`;

export default StyledAddSelectItem;
