import { HANGLE_NUM } from "./hangle-num";
import { ROMAN_NUM } from "./roman-num";
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

  //자식 List를 찾을 함수 TOCID 받아서 indexList에 넣는다.
  const findChildrenList = (TOCID) => {
    //전체 리스트에서 TOCID와 PRNT_TOCID를 filter하여 자기 자식list를 찾는다
    //선택하여 삭제한 tabKey가 있을 수 있기 때문에 tabKey가 있을 때 만 실행한다.
    if (MLC_TOCLIST[tabKey]) {
      const childrenList = MLC_TOCLIST[tabKey].filter(
        (f) => f.PRNT_TOCID === TOCID
      );
      // 찾은 자식list map으로 돌려 하나하나 Numbering을 해준다.
      childrenList.map((item, index) => {
        // indexList에 새로운 객체를 넣는다.
        switch (item.INDENT) {
          case 1:
            indexList = Object.assign(indexList, {
              [item.TOCID]: {
                Numbering: ROMAN_NUM[index + 1],
                TITLE: item.TITLE,
              },
            });
            break;
          case 3:
            indexList = Object.assign(indexList, {
              [item.TOCID]: {
                Numbering: HANGLE_NUM[index + 1],
                TITLE: item.TITLE,
              },
            });
            break;
          default:
            indexList = Object.assign(indexList, {
              [item.TOCID]: { Numbering: index + 1, TITLE: item.TITLE },
            });
            break;
        }
        //childrenList 각각의 배열의 TOCID값이 자식 List를 가졌는지 확인한다.
        return MLC_TOCLIST[tabKey].filter((f) => f.PRNT_TOCID === item.TOCID)
          .length > 0
          ? findChildrenList(item.TOCID)
          : [];
      });
    }
  };
  findChildrenList("root", 1);
  return indexList;
};
