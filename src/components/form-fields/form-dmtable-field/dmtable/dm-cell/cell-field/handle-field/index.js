import StyledHandleField from './styled';
export const HandleField = ({ attributes, listeners }) => {
  return (
    <StyledHandleField {...attributes} {...listeners}>
      🟰
    </StyledHandleField>
  );
};
