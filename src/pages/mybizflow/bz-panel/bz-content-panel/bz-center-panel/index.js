import { useEffect, useState } from "react";
import StyledBzCenterPanel from "./styled";
import { RayTab } from "@/components";

const BzCenterPanel = ({ bzSource, bzTabInfo }) => {
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
      <div className="bz-content"></div>
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
