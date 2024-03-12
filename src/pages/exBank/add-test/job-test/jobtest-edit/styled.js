import styled from 'styled-components';

const StyledTestBankEdit = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  .tbank-left-panel {
    width: 400px;
    min-width: 300px;
    height: 100%;
    border-right: 1px solid #efefef;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .tbank-center-panel {
    width: 100%;
    height: 100%;
  }
  .tbank-right-panel {
    min-width: 320px;
    height: 100%;
    border-left: 1px solid #efefef;
  }
`;

export default StyledTestBankEdit;
