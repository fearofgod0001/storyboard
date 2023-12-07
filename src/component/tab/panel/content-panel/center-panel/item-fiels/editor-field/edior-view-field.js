import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { StyledEmptyEditor } from './styled';
const EditorviewField = ({ modal, onEdit }) => {
  return modal && modal !== '' ? <FroalaEditorView /> : <EmptyEditor onEdit={onEdit} />;
};

const EmptyEditor = ({ onEdit }) => {
  return (
    <StyledEmptyEditor onClick={onEdit}>
      <div>내용을 입력해주세요</div>
    </StyledEmptyEditor>
  );
};

export default EditorviewField;
