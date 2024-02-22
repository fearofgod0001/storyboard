import { useState } from "react";

import { StyledEdit } from "./styled";
import { StyledEmptyEditor } from "./styled";

export const EditorField = ({ offset, fieldId, content, onChangeContent }) => {
  const [isEdit, setEdit] = useState(false);

  const onEdit = () => {
    setEdit(true);
  };

  const onBlur = () => {
    setEdit(false);
  };

  const onModelChange = (model) => {
    onChangeContent(fieldId, model, offset);
  };

  return (
    <StyledEdit>
      {isEdit ? (
        <div>test</div>
      ) : (
        <EditorviewField modal={content} onEdit={onEdit} />
      )}
    </StyledEdit>
  );
};

const EditorviewField = ({ modal, onEdit }) => {
  return modal && modal !== "" ? (
    <div onClick={onEdit}>test2</div>
  ) : (
    <EmptyEditor onEdit={onEdit} />
  );
};

const EmptyEditor = ({ onEdit }) => {
  return (
    <StyledEmptyEditor onClick={onEdit}>
      <div>내용을 입력해주세요</div>
    </StyledEmptyEditor>
  );
};

export default EditorField;
