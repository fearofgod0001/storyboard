import styled from "styled-components";

const StyleLeftPanel = styled.div`
  height: calc(100vh - 130px);
  .header {
    height: 50px;
    background-color: #efefef;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: space-between;
  }

  .checkbox-vertical {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`;

export default StyleLeftPanel;
