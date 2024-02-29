import { useState } from 'react';
import { DndKitTreeCore } from './dndkit-tree-core';
import { useEffect } from 'react';
import { makeDndTreeByflatData } from '@/common/utils/tree-helper';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const DndKitTree = ({
  treeData: _treeData,
  rootId,
  prntTreeKey,
  treeKey,
  treeTitleKey,
  keyType,
  numberingList,
  indicator,
  indentationWidth = 20,
  removable,
  allowMultiRoot = false,
  onChangeTree,
  onClickTreeNode,
  onRenderIcon,
  onRenderTitle,
  onContextMenu,
  onRenderContextMenu,
}) => {
  const [treeData, setTreeData] = useState();

  useEffect(() => {
    if (_treeData) {
      const nTreeData = makeDndTreeByflatData(_treeData, rootId, 'PRNT_TOCID', 'TOCID', 'TITLE');
      setTreeData(nTreeData);
    }
  }, [_treeData, rootId]);

  const _onChange = (result) => {
    const nResult = result.map((node, sort) => ({
      ...node.data,
      PRNT_TOCID: node.parentId ?? 'root',

      // keyType === 'String'
      //   ? String(node.id) === '0'
      //     ? '-1'
      //     : node.parentId
      //   : Number(node.id) === 0
      //   ? -1
      //   : node.parentId,

      INDENT: node.depth + 1,
      SORTSQ: sort,
    }));

    onChangeTree(nResult);
  };

  return (
    treeData && (
      <>
        <DndKitTreeCore
          numberingList={numberingList}
          treeData={treeData}
          indicator={indicator}
          indentationWidth={indentationWidth}
          allowMultiRoot={allowMultiRoot}
          onChange={_onChange}
          removable={removable}
          onClickTreeNode={onClickTreeNode}
          onRenderIcon={onRenderIcon}
          onRenderTitle={onRenderTitle}
          onContextMenu={onContextMenu}
        />
        {typeof onRenderContextMenu === 'function' && onRenderContextMenu()}
      </>
    )
  );
};

export default DndKitTree;
