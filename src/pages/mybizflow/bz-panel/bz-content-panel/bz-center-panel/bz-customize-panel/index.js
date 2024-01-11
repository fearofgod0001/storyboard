import { useEffect, useState } from "react";
import StyledBzCustomizePanel from "./styled";
import { Responsive } from "react-grid-layout";

const BzCustomizePanel = ({ bzSource, dragItem, onDropEnd }) => {
  //메모제이션 걸어야함
  const { BZ_FLOW_SOURCE, BZ_MEMO, VZ_SUMMARY } = bzSource;

  const [bzMemo, setBzMemo] = useState();

  useEffect(() => {
    setBzMemo(BZ_MEMO);
  }, [BZ_MEMO]);

  return (
    <StyledBzCustomizePanel>
      <Responsive
        layouts={{ lg: bzMemo }}
        breakpoints={{ lg: 1000, md: 800, sm: 400, xs: 2, xxs: 10 }}
        cols={{ lg: 16, md: 12, sm: 8, xs: 4, xxs: 1 }}
        rowHeight={100}
        width={1200}
        isDroppable={true}
        droppingItem={dragItem}
        onDrop={onDropEnd}
      >
        {bzMemo &&
          bzMemo.map((item, i) => (
            <div key={item.i} className="testMemo">
              {item.scrt}
            </div>
          ))}
      </Responsive>
    </StyledBzCustomizePanel>
  );
};

export default BzCustomizePanel;
