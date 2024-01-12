import { useState, useEffect } from 'react';
import StyledBzLeftPanel from './styled';
import { SettingOutlined } from '@ant-design/icons';
import { BzPortletPanel } from './bz-portlet-panel';

const BzLeftPanel = ({ bzComponent, onDragStart }) => {
  const [_bzComp, setBzComp] = useState();
  useEffect(() => {
    setBzComp(bzComponent);
  }, [bzComponent]);

  return (
    <StyledBzLeftPanel>
      <div className="header">
        <SettingOutlined style={{ marginRight: '3px' }} /> Setting
      </div>
      <div className="bz-component-body">
        <BzPortletPanel bzCompList={_bzComp} onDragStart={onDragStart} />
      </div>
    </StyledBzLeftPanel>
  );
};

export default BzLeftPanel;
