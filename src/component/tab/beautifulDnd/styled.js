import styled from "styled-components";

export const StyledRayTab = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn-panel {
    margin-right: 30px;
  }
  .tab-panel {
    display: flex;
    height: 100%;
    align-items: center;

    .drop-panel {
      display: flex;
      height: 100%;
    }

    .dragtab-panel {
      height: 100%;
      min-width: 100px;

      .dragtab-top {
        height: 2px;
      }
    }

    .dragtab-panel:hover {
      background-color: #fff;
      .dragtab-top {
        background-color: #4491e0;
      }
    }

    .dragtab-panel.on {
      .dragtab-top {
        background-color: #4491e0;
      }
      background-color: #fff;
    }

    .tabItemPlus {
      width: 40px;
      margin: 0px 10px;
      display: flex;
      background-color: #e9e9e9;
      height: 100%;
      justify-content: center;
      align-items: center;
      border-top: 13px;
      border-color: #000;
      cursor: pointer;
    }
  }
`;
