import { useEffect, useState } from 'react';
import StyledBzCustomizePanel from './styled';
import { Responsive } from 'react-grid-layout';
import BzPortletWrap from '../bz-portlet-wrap';

const BzCustomizePanel = ({ bzSource, dragItem, onDropEnd, portletList, pageWidth }) => {
  //메모제이션 걸어야함

  const [_bzSource, setBzSource] = useState();

  useEffect(() => {
    setBzSource(bzSource);
  }, [bzSource]);

  return (
    <StyledBzCustomizePanel>
      <Responsive
        layouts={{ lg: _bzSource }}
        breakpoints={{ lg: 1000, md: 800, sm: 400, xs: 2, xxs: 10 }}
        cols={{ lg: 16, md: 12, sm: 8, xs: 4, xxs: 1 }}
        rowHeight={100}
        width={pageWidth}
        isDroppable={true}
        droppingItem={dragItem}
        onDrop={onDropEnd}
      >
        {_bzSource &&
          _bzSource.map((item, i) => (
            <div key={item.i} className="bz-source">
              <BzPortletWrap
                item={item}
                portletList={portletList}
                portlet={portletList.find((f) => f.i === item.i)}
                bzSource={_bzSource}
              />
            </div>
          ))}
      </Responsive>
    </StyledBzCustomizePanel>
  );
};

export default BzCustomizePanel;
