import { useState, useEffect } from "react";
import { TreeSelect } from "antd";
import { makeRcTreeData } from "@/component/ray-rc-tree";

export const TreeSelectField = ({ value, onChange, exTreeData }) => {
  const [codeData, setCodeData] = useState();

  useEffect(() => {
    if (exTreeData) {
      setCodeData(() => {
        return makeRcTreeData(
          exTreeData,
          -1,
          "CODE_ID",
          "PRNT_CODE_ID",
          "CODE_NM"
        );
      });
    }
  }, [exTreeData]);

  return (
    codeData && (
      <TreeSelect
        showSearch
        style={{ width: "100%" }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeData={codeData}
      />
    )
  );
};
