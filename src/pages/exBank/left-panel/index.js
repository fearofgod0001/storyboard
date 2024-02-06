import { useState, useCallback, useEffect } from "react";
import { Tree } from "antd";
import StyeldExBankLeftPanel from "./styled";

const ExBankLeftPanel = ({ onSelectTreeNode, exDataList }) => {
  const [dataSource, setDataSource] = useState(exDataList);

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

  return (
    <StyeldExBankLeftPanel>
      <div className="left-panel-header"> TestBank</div>
      <div className="test-bank-tree">
        <Tree
          treeData={dataSource}
          autoExpandParent
          onSelect={onSelectTreeNode}
        />
      </div>
    </StyeldExBankLeftPanel>
  );
};

export default ExBankLeftPanel;
