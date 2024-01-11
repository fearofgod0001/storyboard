import StyledBzContentPanel from "./styled";
import BzLeftPanel from "./bz-left-panel";
import BzCenterPanel from "./bz-center-panel";

const BzContentPanel = ({ bzData, onDragStart, onDropEnd, dragItem }) => {
  const { BZ_COMPONENT, BZ_SOURCE, BZ_TAB_INFO } = bzData;

  return (
    <StyledBzContentPanel>
      <div className="bz-left-panel">
        <BzLeftPanel
          bzComponent={BZ_COMPONENT}
          onDragStart={onDragStart}
          onDropEnd={onDropEnd}
        />
      </div>
      <div className="bz-center-panel">
        <BzCenterPanel
          bzSource={BZ_SOURCE}
          bzTabInfo={BZ_TAB_INFO}
          dragItem={dragItem}
          onDropEnd={onDropEnd}
        />
      </div>
    </StyledBzContentPanel>
  );
};

export default BzContentPanel;
