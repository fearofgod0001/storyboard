import React, { useState } from "react";
import IndexTitleField from "../../item-fiels/index-title-field";
import IndexNumbringField from "../../item-fiels/index-numbering-field";
import { FieldLoader } from "../../item-fiels";
import { StyledIndexTitle } from "./styled";

const ManualIndex = ({
  numberingList,
  IndexList = [],
  offset,
  item,
  initContent,
  contentInfo,
  onChangeTocTitle,
  onChangeContent,
}) => {
  const [isEdit, setEdit] = useState(false);

  const onEdit = () => {
    setEdit(true);
  };

  const onBlur = () => {
    setEdit(false);
  };

  const _OnChangeTitle = (content) => {
    onChangeTocTitle(offset, content, item.TOCID);
  };

  const _onChangeContent = (fieldId, model, offset) => {
    onChangeContent(item.TOCID, fieldId, model, offset);
  };

  return (
    <StyledIndexTitle>
      <div key={`item-${item.TOCID}`}>
        <div className="content-title">
          <IndexTitleField
            initValue={item.TITLE}
            onChangeTitle={_OnChangeTitle}
            numberingList={numberingList}
            item={item}
          />
        </div>
        <div className="content-body">
          {contentInfo.map((item, offset) =>
            FieldLoader[item.fieldComp].renderer({
              offset,
              ...item,
              onBlur,
              onEdit,
              isEdit,
              onChangeContent: _onChangeContent,
            })
          )}
        </div>
      </div>
    </StyledIndexTitle>
  );
};

export default React.memo(ManualIndex);
