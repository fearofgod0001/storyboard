import styled from 'styled-components';

export const StyledUserItem = styled.div`
  width: 100%;
  cursor: move;
  display: flex;
  line-height: 30px;
  align-items: center;
  border-bottom: 1px solid #efefef;
  padding-bottom: 6px;

  .user-checkbox {
    width: 30px;
  }

  .user {
    width: 100%;
    .dept-info {
      display: flex;
    }

    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      color: #0039ab;
      font-size: 14px;
    }
  }
`;
