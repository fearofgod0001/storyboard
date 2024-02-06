import ExBankLeftPanel from "./left-panel";
import ExBankContentPanel from "./content-panel";
import StyledExBank from "./styled";
import { useState } from "react";

const init = {
  TEST: {},
  DESCRIBTION: {},
  list: [
    {
      PRNT_CODE_ID: -1,
      CODE_ID: 215,
      CODE_CD: "7844",
      CODE_NM: "문제은행",
      SORT_SQ: 0,
      SORT_SUB_SQ: 1,
    },
    {
      PRNT_CODE_ID: 215,
      CODE_ID: 226,
      CODE_CD: "7853",
      CODE_NM: "수신",
      SORT_SQ: 1,
      SORT_SUB_SQ: 1,
    },
    {
      PRNT_CODE_ID: 226,
      CODE_ID: 227,
      CODE_CD: "7853",
      CODE_NM: "수신업무편",
      SORT_SQ: 1,
      SORT_SUB_SQ: 1,
    },
    {
      PRNT_CODE_ID: 215,
      CODE_ID: 228,
      CODE_CD: "7853",
      CODE_NM: "여신",
      SORT_SQ: 1,
      SORT_SUB_SQ: 1,
    },
    {
      PRNT_CODE_ID: 228,
      CODE_ID: 229,
      CODE_CD: "7853",
      CODE_NM: "가계여신상품편",
      SORT_SQ: 1,
      SORT_SUB_SQ: 1,
    },
  ],
};

const ExBank = ({}) => {
  const [exData, setExData] = useState(init);
  const [selectNodeId, setSelectNodeId] = useState();

  //트리데이터 선택시 실행하는 함수
  const onSelectTreeNode = (codeIds, e) => {
    setSelectNodeId(codeIds);
    console.debug("codeIds", codeIds);
  };

  return (
    <StyledExBank>
      <div className="left-panel">
        <ExBankLeftPanel
          exDataList={exData.list}
          onSelectTreeNode={onSelectTreeNode}
        />
      </div>

      <div className="content-panel">
        <ExBankContentPanel
          exDataList={exData.list}
          onSelectTreeNode={onSelectTreeNode}
          selectNodeId={selectNodeId}
        />
      </div>
    </StyledExBank>
  );
};

export default ExBank;
