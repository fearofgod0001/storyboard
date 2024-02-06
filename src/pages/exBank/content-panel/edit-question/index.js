import { useState, useCallback, useEffect } from "react";
import { TreeSelect, Input, Select } from "antd";
import StyldedEditQuestion from "./styled";
import MakeMcq from "../../../../component/make-mcq";
import MakeSaq from "../../../../component/make-saq";

const EditQuestion = ({ exDataList, onSelectTreeNode, selectNodeId }) => {
  const [dataSource, setDataSource] = useState(exDataList);
  const [exType, setExType] = useState("MCQ");

  const makeRootNodes = useCallback(
    (inputList = [], rootId = 0, keyField, parentKeyField, titleField) => {
      const rootNodes = inputList?.filter((f) => f[parentKeyField] === rootId);
      const treeDatas = rootNodes.map((rootNode) => {
        const rootData = makeTreeData(
          inputList,
          rootNode.CODE_ID,
          rootNode,
          "CODE_ID",
          "PRNT_CODE_ID",
          "CODE_NM"
        );
        return rootData;
      });
      return treeDatas;
    },
    []
  );

  const makeTreeData = useCallback(
    (
      inputList = [],
      rootId = 0,
      rootNode,
      keyField,
      parentKeyField,
      titleField
    ) => {
      if (rootNode) {
        const makeChildren = (
          tree,
          parentIdx,
          keyField,
          parentKeyField,
          titleField
        ) => {
          const childrenList = tree.filter(
            (f) => f[keyField] !== rootId && f[parentKeyField] === parentIdx
          );
          if (childrenList.length > 0) {
            return childrenList.map((item) => ({
              key: item[keyField],
              title: item[titleField],
              value: item[keyField],
              children:
                makeChildren(
                  tree,
                  item[keyField],
                  keyField,
                  parentKeyField,
                  titleField
                ) || [],
            }));
          }
          return [];
        };
        return {
          key: rootNode[keyField],
          value: rootNode[keyField],
          title: rootNode[titleField],
          expanded: true,
          children:
            makeChildren(
              inputList,
              rootNode[keyField],
              keyField,
              parentKeyField,
              titleField
            ) || [],
        };
      }
      return {};
    },
    []
  );

  useEffect(() => {
    if (exDataList) {
      const tree = makeRootNodes(
        exDataList,
        -1,
        "CODE_ID",
        "PRNT_CODE_ID",
        "CODE_NM",
        false
      );
      setDataSource(tree);
    }
  }, [exDataList, makeTreeData, makeRootNodes]);

  const onChangeTreeSelect = (newValue) => {
    onSelectTreeNode(newValue);
  };

  const onChangeExTitle = (e) => {
    console.debug(e.target.value);
  };

  const handleChange = (value) => {
    console.debug(`selected ${value}`);
    setExType(value);
  };

  return (
    <StyldedEditQuestion>
      <div className="create-classify-data">
        <div className="ex-header">분류체계 :</div>
        <TreeSelect
          showSearch
          value={selectNodeId}
          style={{ width: "100%" }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={onChangeTreeSelect}
          treeData={dataSource}
        />
      </div>

      <div className="create-ex-format">
        <div className="ex-header">유형 :</div>
        <div style={{ width: "100%" }}>
          <Select
            defaultValue={exType}
            style={{ width: 150 }}
            onChange={handleChange}
            options={[
              {
                value: "SAQ",
                label: "주관식",
              },
              {
                value: "MCQ",
                label: "객관식",
              },
            ]}
          />
        </div>
      </div>
      <div className="change-setting">문제 설정</div>

      {exType === "MCQ" && <MakeMcq />}
      {exType === "SAQ" && <MakeSaq />}
    </StyldedEditQuestion>
  );
};

export default EditQuestion;
