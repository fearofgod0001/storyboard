import React, { useState, useEffect } from "react";
import IndexNumbringField from "../../item-fiels/index-numbering-field";
import IndexTitleField from "../../item-fiels/index-title-field";
import { FieldLoader } from "../../item-fiels";
import { StyledIndexSectionTitle } from "./styled";
const ManualIndexSection = ({
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
    <StyledIndexSectionTitle>
      <div key={`item-${item.TOCID}`} style={{ marginLeft: "15px" }}>
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
    </StyledIndexSectionTitle>
  );
};

export default React.memo(ManualIndexSection);
