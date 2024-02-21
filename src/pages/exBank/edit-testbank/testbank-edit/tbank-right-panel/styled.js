import styled from 'styled-components';

const StyledTbankRightPanel = styled.div`
  .rpanel-head {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    background-color: #f8f8f8;
  }
  .rpanel-col-setting,
  .rpanel-runtime,
  .rpanel-start-date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 11px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 80px;
    font-weight: 600;
    text-align: center;
  }

  .separator {
    width: 1px;
    height: 20px;
    background-color: #efefef;
    margin: 0px 15px;
  }
`;

export default StyledTbankRightPanel;
