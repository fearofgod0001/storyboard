import styled from 'styled-components';

const StyledSrchTestList = styled.div`
  width: 100%;
  border: 1px solid #efefef;
  border-radius: 5px;
  .list-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    background-color: #efefef;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .list-content {
    overflow-y: scroll;
    /* max-height: 26vh; */
    max-height: 68vh;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #4491e0;
    }
    &::-webkit-scrollbar-track {
      background-color: #dee1e6;
    }
  }
  .list-item {
    margin: 2px;
    border: 1px solid #efefef;
    border-radius: 5px;
    .item-title {
      height: 30px;
      background-color: #efefef;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      display: flex;
      align-items: center;
      padding-left: 4px;
      font-weight: 600;
      font-size: 13px;

      cursor: pointer;
      .item-icon {
        margin: 0 3px 0 3px;
      }
      .item-content {
        width: 100%;
      }
      .item-show {
        cursor: pointer;
        margin-right: 3px;
      }
    }
    .item-descrip {
      font-size: 12px;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      .item-arrow {
        cursor: pointer;
        width: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #efefef;
        border-radius: 5px;
        &:hover {
          color: white;
          background-color: #4491e0;
        }
      }
    }
  }
`;

export default StyledSrchTestList;
