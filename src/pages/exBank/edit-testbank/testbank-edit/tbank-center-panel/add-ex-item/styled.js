import styled from 'styled-components';

const StyledAddExItem = styled.div`
  display: flex;
  .ex-category {
    width: 35%;
    height: 580px;
  }

  .category-info {
    width: 100%;
    .ex-list {
      height: 580px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #4491e0;
      }
      &::-webkit-scrollbar-track {
        background-color: #dee1e6;
      }
    }
    .ex-item {
      height: 230px;
      border: 1px solid black;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
`;

export default StyledAddExItem;
