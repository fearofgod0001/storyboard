import StyledBzPanel from "./styled";
import BzContentPanel from "./bz-content-panel";

const BizFlowPanel = ({ bzData, onDragStart, onDropEnd, dragItem }) => {
  return (
    <StyledBzPanel>
      <div className="bz-header-panel">My Biz Flow</div>
      <div className="bz-body-panel">
        <BzContentPanel
          bzData={bzData}
          onDragStart={onDragStart}
          onDropEnd={onDropEnd}
          dragItem={dragItem}
        />
      </div>
    </StyledBzPanel>
  );
};

export default BizFlowPanel;
