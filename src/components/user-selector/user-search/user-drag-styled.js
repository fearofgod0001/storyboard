import styled from 'styled-components';

export const StyledUserDrag = styled.div`
  padding: 15px;
  cursor: move;
  display: flex;
  line-height: 30px;
  align-items: center;
  border: 1px groove #efefef;
  background-color: #fff;

  .user-checkbox {
    width: 30px;
  }

  .user-info {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: blue;
    font-size: 14px;
  }
`;
