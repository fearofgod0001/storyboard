import { StyledTabsPanel } from "./styled";
import RayTab from "../beautifulDnd";

const TabPanel = ({ tabInfos, onChange, tabAdd, tabRemove }) => {
  return (
    <StyledTabsPanel>
      <div className="tab-icon">
        <i class="fa-regular fa-window-restore"></i>
      </div>
      <RayTab
        onChange={onChange}
        value={tabInfos}
        tabAdd={tabAdd}
        tabRemove={tabRemove}
      />
    </StyledTabsPanel>
  );
};

export default TabPanel;
