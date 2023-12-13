import React, { useState } from "react";
import { Form } from "antd";
import IndexTitleField from "./index-title-field";
import { FieldLoader } from "../../item-fiels";

const DefaultIndex = ({
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
    <div className={`toc-${item.INDENT}`}>
      <div className="content-title">
        <Form.Item
          className="frm-title"
          name={item.TOCID}
          hasFeedback
          rules={[
            {
              required: true,
              message: "* 목차명을 입력해주세요",
            },
          ]}
        >
          <IndexTitleField
            key={`toc-${item.TOCID}`}
            numberingList={numberingList}
            item={item}
          />
        </Form.Item>
      </div>
      <div className="content-body">
        {contentInfo &&
          contentInfo.map((item, offset) =>
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

export default DefaultIndex;
