import styled from 'styled-components';

export const Styled = styled.div`
  border: 1px solid #efefef;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid #6c6c6c;
    padding: 10px;
    background-color: #efefef;
    font-weight: 600;
  }

  .content-body {
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
    .row {
      border: 1px solid #b4b4b4;
      background-color: #efefef;
      display: flex;
      .row-label {
        display: flex;
        width: 20%;
        align-items: center;
        justify-content: center;
      }
      .row-content {
        width: 80%;
        background-color: #fff;
        .item {
          display: flex;
          height: 25px;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          padding-left: 10px;
        }

        .user-name {
          width: 40%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dept-name {
          width: 60%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .row:not(:first-child) {
      border-top: 0px;
    }
  }
`;
