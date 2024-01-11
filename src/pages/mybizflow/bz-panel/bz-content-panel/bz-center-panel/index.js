import { useEffect, useState } from "react";
import StyledBzCenterPanel from "./styled";
import BzCustomizePanel from "./bz-customize-panel";
import { RayTab } from "@/components";

const BzCenterPanel = ({ bzSource, bzTabInfo, dragItem, onDropEnd }) => {
  const [_bzTabInfo, setTabInfo] = useState([]);

  useEffect(() => {
    if (bzTabInfo) {
      setTabInfo(bzTabInfo);
    }
  }, [bzTabInfo]);

  const onChange = () => {};

  const onSelectedTab = () => {};
  const onDragEnd = () => {};
  const onAddTab = () => {};
  const onRemoveTab = () => {};

  return (
    <StyledBzCenterPanel>
      <div className="bz-content">
        <BzCustomizePanel
          bzSource={bzSource}
          dragItem={dragItem}
          onDropEnd={onDropEnd}
        />
      </div>
      <div className="bz-tab">
        <RayTab
          tabList={_bzTabInfo}
          onChange={onChange}
          onSelectedTab={onSelectedTab}
          onDragEnd={onDragEnd}
          onAddTab={onAddTab}
          onRemoveTab={onRemoveTab}
        />
      </div>
    </StyledBzCenterPanel>
  );
};

export default BzCenterPanel;
