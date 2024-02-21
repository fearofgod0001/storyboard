import { useState, useCallback, useEffect } from 'react';
import { TreeSelect } from 'antd';

export const FormSortTreeSelectField = ({ pageMode, treeData, onSelectTreeNode, value, onChange }) => {
  const [dataSource, setDataSource] = useState(treeData);

  const makeRootNodes = useCallback((inputList = [], rootId = 0, keyField, parentKeyField, titleField) => {
    const rootNodes = inputList?.filter((f) => f[parentKeyField] === rootId);
    const treeDatas = rootNodes.map((rootNode) => {
      const rootData = makeTreeData(inputList, rootNode.CODE_ID, rootNode, 'CODE_ID', 'PRNT_CODE_ID', 'CODE_NM');
      return rootData;
    });
    return treeDatas;
  }, []);

  const makeTreeData = useCallback((inputList = [], rootId = 0, rootNode, keyField, parentKeyField, titleField) => {
    if (rootNode) {
      const makeChildren = (tree, parentIdx, keyField, parentKeyField, titleField) => {
        const childrenList = tree.filter((f) => f[keyField] !== rootId && f[parentKeyField] === parentIdx);
        if (childrenList.length > 0) {
          return childrenList.map((item) => ({
            key: item[keyField],
            title: item[titleField],
            value: item[keyField],
            children: makeChildren(tree, item[keyField], keyField, parentKeyField, titleField) || [],
          }));
        }
        return [];
      };
      return {
        key: rootNode[keyField],
        value: rootNode[keyField],
        title: rootNode[titleField],
        expanded: true,
        children: makeChildren(inputList, rootNode[keyField], keyField, parentKeyField, titleField) || [],
      };
    }
    return {};
  }, []);

  useEffect(() => {
    if (treeData) {
      const tree = makeRootNodes(treeData, -1, 'CODE_ID', 'PRNT_CODE_ID', 'CODE_NM', false);
      setDataSource(tree);
    }
  }, [treeData, makeTreeData, makeRootNodes]);

  const onChangeTreeSelect = (newValue) => {
    onSelectTreeNode(newValue);
    typeof onChange === 'function' && onChange(newValue);
  };

  return (
    <TreeSelect
      showSearch
      value={value}
      style={{ width: '100%' }}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChangeTreeSelect}
      treeData={dataSource}
      disabled={pageMode === 'V'}
    />
  );
};
