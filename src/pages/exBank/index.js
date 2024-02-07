import ExBankLeftPanel from "./left-panel";
import ExBankContentPanel from "./content-panel";
import StyledExBank from "./styled";
import { useState } from "react";

const mList = [
  {
    RNUM: 1,
    FULL_PATH: " > 수신 > 수신업무편 ",
    CODE_ID: 227,
    MLC_IDX: 15933,
    EX_TITLE: "완전가스의 비열비에 대한 설명 중 틀린 것은?",
    EX_TYPE: "객관식",
    EX_DATA: {},
    REG_USER_ID: 1,
    REG_USER_NM: "시스템관리자",
    REG_DEPT_ID: 0,
    REG_DEPT_NM: "부서관리",
    MLC_PUB_DTTM: "2024-01-30T15:00:00.000+00:00",
    MLC_EXPIRED_DTTM: "9999-12-30T15:00:00.000+00:00",
    MLC_REG_DTTM: "2024-01-31T19:04:15.000+00:00",
    TOTAL_CNT: 3910,
    RNO: 3910,
  },
  {
    RNUM: 2,
    FULL_PATH: " > 여신 > 가계여신상품편",
    CODE_ID: 229,
    MLC_IDX: 15943,
    EX_TITLE: "열역학 제2법칙에 대한 설명으로 옳은 것은?",
    EX_TYPE: "주관식",
    EX_DATA: {},
    REG_USER_ID: 2,
    REG_USER_NM: "이태석",
    REG_DEPT_ID: 0,
    REG_DEPT_NM: "부서관리",
    MLC_PUB_DTTM: "2024-01-18T15:00:00.000+00:00",
    MLC_EXPIRED_DTTM: "9999-12-30T15:00:00.000+00:00",
    MLC_REG_DTTM: "2024-02-02T00:45:40.000+00:00",
    TOTAL_CNT: 3910,
    RNO: 3909,
  },
];

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
  };

  const onSubmit = () => {
    console.debug("onSubmit");
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
          mList={mList}
          onSelectTreeNode={onSelectTreeNode}
          selectNodeId={selectNodeId}
          onSubmit={onSubmit}
        />
      </div>
    </StyledExBank>
  );
};

export default ExBank;
