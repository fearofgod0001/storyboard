import styled from 'styled-components';
export const StyledDmTable = styled.div`
  * {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    font-size: 14px;
  }

  table,
  .divTable {
    width: fit-content;
  }

  .row-handle-header {
    width: 45px;
    position: relative;
    font-weight: bold;
    border: 1px solid #c1c1c1;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
  }
  .row-handle {
    display: flex;
    padding: 5px;
    border: 1px solid #efefef;
    width: 45px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .th {
    position: relative;
    font-weight: bold;
    border: 1px solid #c1c1c1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #6464641c;
    z-index: 0;
  }

  .th:not(:first-child) {
    border-left: 0; /* 첫 번째 th를 제외한 나머지 th의 왼쪽 테두리 0으로 설정 */
  }

  .tr {
    display: flex;
    width: fit-content;
  }

  .td {
    padding: 5px;
    border: 1px solid #efefef;
  }

  .td:not(:first-child) {
    border-left: 0; /* 첫 번째 th를 제외한 나머지 th의 왼쪽 테두리 0으로 설정 */
  }

  .no-data {
    padding: 20px;
    border: 1px solid #efefef;
  }

  .resizer {
    position: absolute;
    top: 0;
    height: 100%;
    width: 5px;
    background: rgba(0, 0, 0, 0.5);
    cursor: col-resize;
    user-select: none;
    touch-action: none;
  }

  .resizer.ltr {
    right: 0;
  }

  .resizer.rtl {
    left: 0;
  }

  .resizer.isResizing {
    background: blue;
    opacity: 1;
  }

  @media (hover: hover) {
    .resizer {
      opacity: 0;
    }

    *:hover > .resizer {
      opacity: 1;
    }
  }
`;
