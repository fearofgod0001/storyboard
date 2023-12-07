import React, { useState, useEffect } from 'react';
import IndexTitleField from '../../item-fiels/index-title-field';
import { FieldLoader } from '../../item-fiels';
const ManualIndex = ({ offset, item, initContent, contentInfo, onChangeTocTitle, onChangeContent }) => {
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
    <div key={`item-${item.TOCID}`}>
      <div>
        <IndexTitleField initValue={item.TITLE} onChangeTitle={_OnChangeTitle} />
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
  );
};

export default React.memo(ManualIndex);
