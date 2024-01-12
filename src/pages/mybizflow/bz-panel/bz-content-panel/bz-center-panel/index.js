import { useEffect, useState, useRef } from 'react';
import StyledBzCenterPanel from './styled';
import BzCustomizePanel from './bz-customize-panel';
import { RayTab } from '@/components';

const BzCenterPanel = ({ bzSource, bzTabInfo, dragItem, onDropEnd, portletList }) => {
  const [_bzTabInfo, setTabInfo] = useState([]);
  const [pageWidth, setPageWidth] = useState();

  const pageWidthRef = useRef();

  useEffect(() => {
    if (window.innerWidth && pageWidthRef) {
      const width = pageWidthRef.current.getBoundingClientRect().width;
      setTimeout(() => {
        setPageWidth(width);
      }, 500);
    }
  }, [window.innerWidth]);

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
      <div className="bz-content" ref={pageWidthRef}>
        <BzCustomizePanel
          bzSource={bzSource}
          dragItem={dragItem}
          onDropEnd={onDropEnd}
          portletList={portletList}
          pageWidth={pageWidth}
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
