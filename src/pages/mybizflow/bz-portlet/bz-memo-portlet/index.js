import { useState } from "react";
import FroalaEditor from "@/components/editor/FroalaEditor";
import StyledBzMemoPortlet from "./styled";

const BzMemoPortlet = ({ value, onChange }) => {
  const [model, setModel] = useState();

  const onChangeModel = (model) => {
    setModel(model);
  };

  return (
    <StyledBzMemoPortlet>
      <div className="memo-header"></div>
      <div className="memo-content">
        <FroalaEditor
          model={model}
          onModelChange={onChangeModel}
          toolbarInline
        />
      </div>
    </StyledBzMemoPortlet>
  );
};

export default BzMemoPortlet;
