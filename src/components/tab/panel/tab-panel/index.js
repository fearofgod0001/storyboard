import { StyledTabsPanel } from "./styled";
import { RayTab } from "../../beautifulDnd";

const TabPanel = ({
  tabInfos,
  tabKey,
  onSelectedTab,
  onChange,
  onDragEnd,
  onChangeTab,
  onAddTab,
  onRemoveTab,
  onSave,
}) => {
  return (
    <StyledTabsPanel>
      <div className="tab-icon">
        {/* <i className="fa-regular fa-window-restore"></i> */}
      </div>
      <RayTab
        tabList={tabInfos}
        onSelectedTab={onSelectedTab}
        onAddTab={onAddTab}
        onRemoveTab={onRemoveTab}
        onChange={onChange}
        onSave={onSave}
        onDragEnd={onDragEnd}
        // value={tabInfos}
        // tabKey={tabKey}
        // onChangeTab={onChangeTab}
        // onTabRemove={onTabRemove}
      />
    </StyledTabsPanel>
  );
};

export default TabPanel;
