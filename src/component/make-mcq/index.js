import { useEffect, useState } from "react";
import StyledMakeMcq from "./styled";

import { InputNumber } from "antd";

const MakeMcq = ({}) => {
  const [itemCount, setItemCount] = useState();
  const onChange = (cnt) => {
    console.log("changed", cnt);
    setItemCount(cnt);
  };

  useEffect(() => {}, [itemCount]);

  return (
    <StyledMakeMcq>
      <div className="item-count">
        <div className="item-title">항목 갯수 : </div>
        <InputNumber min={1} max={4} defaultValue={4} onChange={onChange} />
      </div>
    </StyledMakeMcq>
  );
};

export default MakeMcq;
