import StyledBzPanel from "./styled";
import BzContentPanel from "./bz-content-panel";

const BizFlowPanel = ({ bzData }) => {
  return (
    <StyledBzPanel>
      <div className="bz-header-panel">My Biz Flow</div>
      <div className="bz-body-panel">
        <BzContentPanel bzData={bzData} />
      </div>
    </StyledBzPanel>
  );
};

export default BizFlowPanel;
