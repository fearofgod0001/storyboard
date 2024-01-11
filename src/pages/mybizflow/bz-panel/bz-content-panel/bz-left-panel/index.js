import { useState, useEffect } from 'react';
import StyledBzLeftPanel from './styled';
import { SettingOutlined } from '@ant-design/icons';

const BzLeftPanel = ({ bzComponent }) => {
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
        {_bzComp &&
          _bzComp.map((item, i) => {
            return <div className="bz-component-item"> {item.tools} </div>;
          })}
      </div>
    </StyledBzLeftPanel>
  );
};

export default BzLeftPanel;
