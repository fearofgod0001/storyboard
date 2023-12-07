import { useEffect, useState } from "react";
import EditTree from "./edit-tree";
import StyledLeftPanel from "./styled";
import useResizeObserver from "use-resize-observer";
import uuid from "react-uuid";

const LeftPanel = ({
  tocListAsTree,
  onChangeTree,
  onCreateIndex,
  numberingList,
  handleContextMenu,
}) => {
  return (
    <StyledLeftPanel>
      <div className="header">
        목차
        <div className="plus" onClick={onCreateIndex}>
          <i className="fa-solid fa-square-plus"></i>
        </div>
      </div>
      <div className="tree-panel">
        <EditTree
          // key={treeKey}
          tocListAsTree={tocListAsTree}
          onChangeTree={onChangeTree}
          numberingList={numberingList}
        />
      </div>
    </StyledLeftPanel>
  );
};

export default LeftPanel;
