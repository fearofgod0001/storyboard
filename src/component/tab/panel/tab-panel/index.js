import { StyledTabsPanel } from "./styled";
import { RayTab } from "../../beautifulDnd/index";

const TabPanel = ({ tabInfos, onChange, tabAdd, tabRemove, setContent }) => {
  return (
    <StyledTabsPanel>
      <div className="tab-icon">
        <i class="fa-solid fa-window-restore"></i>
      </div>
      <RayTab
        onChange={onChange}
        value={tabInfos}
        tabAdd={tabAdd}
        tabRemove={tabRemove}
        setContent={setContent}
      />
    </StyledTabsPanel>
  );
};

export default TabPanel;
