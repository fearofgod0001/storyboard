import React, { useState } from "react";
import IndexTitleField from "../../item-fiels/index-title-field";
import IndexNumbringField from "../../item-fiels/index-numbering-field";
import { FieldLoader } from "../../item-fiels";
import { StyledIndexSubSectionTitle } from "./style";

const ManualIndexSubSection = ({
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

  console.debug("contentInfo ====>", contentInfo);

  return (
    <StyledIndexSubSectionTitle>
      <div key={`item-${item.TOCID}`} style={{ marginLeft: "30px" }}>
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
    </StyledIndexSubSectionTitle>
  );
};

export default React.memo(ManualIndexSubSection);
