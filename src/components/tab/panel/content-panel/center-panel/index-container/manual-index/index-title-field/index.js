import { Input } from "antd";
import { useEffect, useState } from "react";
import IndexNumbringField from "../index-numbering-field";
import { StyledIndexTitle } from "./styled";

const IndexTitleField = ({ value, onChange, numberingList, item }) => {
  const [_value, setValue] = useState(value);
  useEffect(() => {
    if (_value !== value) {
      console.debug("onChange ~~~~~");
      setValue(_value);
    }
  }, [value, _value]);

  return (
    <StyledIndexTitle className="toc-panel">
      <IndexNumbringField numberingList={numberingList} item={item} />
      <Input
        onChange={onChange}
        placeholder="목차명을 입력해 주세요"
        value={_value}
      />
    </StyledIndexTitle>
  );
};

export default IndexTitleField;
