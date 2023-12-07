export const HANGLE_NUM = {
  1: "가",
  2: "나",
  3: "다",
  4: "라",
  5: "마",
  6: "바",
  7: "사",
  8: "아",
  9: "자",
  10: "차",
  11: "카",
  12: "타",
  13: "파",
  14: "하",
  15: "거",
  16: "너",
  17: "더",
  18: "러",
  19: "머",
  20: "버",
  21: "서",
  22: "어",
  23: "저",
  24: "처",
  25: "커",
  26: "터",
  27: "퍼",
  28: "허",
  29: "고",
  30: "노",
  31: "도",
  32: "로",
  33: "모",
  34: "보",
  35: "소",
  36: "오",
  37: "조",
  38: "초",
  39: "코",
  40: "토",
  41: "포",
  42: "호",
};

export const ROMAN_NUM = {
  1: "Ⅰ",
  2: "Ⅱ",
  3: "Ⅲ",
  4: "Ⅳ",
  5: "Ⅴ",
  6: "Ⅵ",
  7: "Ⅶ",
  8: "Ⅷ",
  9: "Ⅸ",
  10: "Ⅹ",
  11: "ⅩⅠ",
  12: "ⅩⅡ",
  13: "ⅩⅢ",
  14: "ⅩⅣ",
  15: "ⅩⅤ",
  16: "ⅩⅥ",
  17: "ⅩⅦ",
  18: "ⅩⅧ",
  19: "ⅩⅨ",
  20: "ⅩⅩ",
  21: "ⅩⅩⅠ",
  22: "ⅩⅩⅡ",
  23: "ⅩⅩⅢ",
  24: "ⅩⅩⅣ",
  25: "ⅩⅩⅤ",
  26: "ⅩⅩⅥ",
  27: "ⅩⅩⅦ",
  28: "ⅩⅩⅧ",
  29: "ⅩⅩⅨ",
  30: "ⅩⅩⅩ",
  31: "ⅩⅩⅩⅠ",
  32: "ⅩⅩⅩⅡ",
  33: "ⅩⅩⅩⅢ",
  34: "ⅩⅩⅩⅣ",
  35: "ⅩⅩⅩⅤ",
  36: "ⅩⅩⅩⅥ",
  37: "ⅩⅩⅩⅦ",
  38: "ⅩⅩⅩⅧ",
  39: "ⅩⅩⅩⅨ",
  40: "ⅩⅩⅩⅩ",
  41: "ⅩⅩⅩⅩⅠ",
  42: "ⅩⅩⅩⅩⅡ",
};

export const numberingData = ({ mContent, tabKey }) => {
  const { MLC_TOCLIST } = mContent;

  //   const nTocList = MLC_TOCLIST[tabKey].map((s, index) => {
  //     //INDENT가 1일 때 ROMAN_NUM key값을 출력한다.
  //     let filterIndex = '';
  //     if (s.INDENT === 1) {
  //       const indentOneArray = MLC_TOCLIST[tabKey].filter((f) => f.INDENT === 1);
  //       filterIndex = indentOneArray.findIndex((f) => f.TOCID === s.TOCID);
  //       return Object.assign(s, { Numbering: ROMAN_NUM[filterIndex + 1] });
  //       //INDENT가 2일 때 일반 index값을 출력한다.
  //     } else if (s.INDENT === 2) {
  //       const indentOtherArray = MLC_TOCLIST[tabKey].filter((f) => f.PRNT_TOCID === s.PRNT_TOCID);
  //       filterIndex = indentOtherArray.findIndex((f) => f.TOCID === s.TOCID);
  //       return Object.assign(s, { Numbering: filterIndex + 1 });
  //       //INDENT가 3일 때 HANGLE_NUM key값을 출력한다.
  //     } else {
  //       const indentOtherArray = MLC_TOCLIST[tabKey].filter((f) => f.PRNT_TOCID === s.PRNT_TOCID);
  //       filterIndex = indentOtherArray.findIndex((f) => f.TOCID === s.TOCID);
  //       return Object.assign(s, { Numbering: HANGLE_NUM[filterIndex + 1] });
  //     }
  //   });

  //   console.debug('NumberingData result ===>', nTocList);

  let indexList = {};

  //자식 List를 찾을 함수 PRNT_TOCID와 Numbering을 받아서 indexList에 넣는다.
  const findChildrenList = (TOCID, Numbering) => {
    //전체 리스트에서 PRNT_TOCID 와 입력받은 TOCID를 filter하여 자기 자식list를 찾는다
    const childrenList = MLC_TOCLIST[tabKey].filter(
      (f) => f.PRNT_TOCID === TOCID
    );
    //찾은 리스트를 map으로 돌려 하나하나 Numbering을 해준다.
    childrenList.map((item, index) => {
      // indexList에 새로운 객체를 넣는다.
      indexList = Object.assign(indexList, {
        [item.TOCID]: { Numbering: Numbering, TITLE: item.TITLE },
      });
      //childrenList 각각의 배열의 TOCID값이 자식 List를 가졌는지 확인한다.
      return MLC_TOCLIST[tabKey].filter((f) => f.PRNT_TOCID === item.TOCID)
        .length > 0
        ? findChildrenList(item.TOCID, Numbering + 1)
        : [];
    });
  };
  findChildrenList("root", 1);
  return indexList;
};
