import styled from 'styled-components';

const StyledLayoutFIeld = styled.div`
  border-radius: 5px;
  border: 1px solid #efefef;
  margin-left: 5px;
  margin-right: 5px;
  height: 100%;
  position: relative;
  .layout-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    background-color: #efefef;
  }
  .layout-content {
    overflow-y: scroll;
    max-height: 38vh;
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
  .exitem {
    margin: 2px;
    border: 1px solid #efefef;
    border-radius: 5px;
    .exitem-header {
      display: flex;
      justify-content: space-between;
      background-color: #4491e0;
      padding: 5px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      font-size: 12px;
      font-weight: bolder;
      color: white;
    }
    .delete-btn {
      cursor: pointer;
    }
    .exitem-title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .exitem-content {
      padding: 5px;
      height: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .dummy1 {
        width: 85%;
        height: 5px;
        background-color: #ccc;
        border-radius: 5px;
        margin-bottom: 5px;
      }
      .dummy2 {
        width: 70%;
        height: 5px;
        background-color: #ccc;
        border-radius: 5px;
      }
    }
  }
  .hover-text {
    position: absolute;
  }
`;

export default StyledLayoutFIeld;
