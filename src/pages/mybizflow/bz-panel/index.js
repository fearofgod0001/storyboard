import StyledBzPanel from "./styled";
import BzContentPanel from "./bz-content-panel";

const BizFlowPanel = ({ bzComponent, onDragStart, onDropEnd, dragItem }) => {
  return (
    <StyledBzPanel>
      <div className="bz-header-panel">My Biz Flow</div>
      <div className="bz-body-panel">
        <BzContentPanel
          bzComponent={bzComponent}
          onDragStart={onDragStart}
          onDropEnd={onDropEnd}
          dragItem={dragItem}
        />
      </div>
    </StyledBzPanel>
  );
};

export default BizFlowPanel;
