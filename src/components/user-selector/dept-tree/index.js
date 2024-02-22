import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import RayRcTree from '@/components/ray-rc-tree';

export const DeptTree = ({ treeData, onSelectTreeNode }) => {
  return (
    <div className="tree-pan">
      <div className="tree-header">
        <TeamOutlined style={{ paddingRight: '5px' }} />
        부서
      </div>
      <div className="tree-dept">
        {treeData && (
          <RayRcTree
            treeData={treeData}
            defaultExpandAll
            rootId={0}
            keyField="DEPT_ID"
            parentKeyField="PRNT_DEPT_ID"
            titleField="DEPT_NM"
            onSelectTreeNode={onSelectTreeNode}
          />
        )}
      </div>
    </div>
  );
};
