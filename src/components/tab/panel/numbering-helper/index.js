import HANGLE_NUM from "./hangle-num";
import ROMAN_NUM from "./roman-num";
import CIRCLE_NUM from "./circle-alphabet-num";

export const makeToc = ({ mContent, tabKey }) => {
  const { MLC_TOCLIST } = mContent;

  const indexList = {};

  const findLastChilden = (lastTocId) => {
    if (MLC_TOCLIST[tabKey]) {
      const childrenList = MLC_TOCLIST[tabKey].filter(
        (f) => f.PRNT_TOCID === lastTocId
      );
      const lastNode = childrenList.pop();
      return lastNode ? findLastChilden(lastNode.TOCID) : lastTocId;
    }
  };

  //자식 List를 찾을 함수 TOCID 받아서 indexList에 넣는다.
  const findChildrenList = (tocId) => {
    //전체 리스트에서 TOCID와 PRNT_TOCID를 filter하여 자기 자식list를 찾는다
    //선택하여 삭제한 tabKey가 있을 수 있기 때문에 tabKey가 있을 때 만 실행한다.
    if (MLC_TOCLIST[tabKey]) {
      const childrenList = MLC_TOCLIST[tabKey].filter(
        (f) => f.PRNT_TOCID === tocId
      );
      // 찾은 자식list map으로 돌려 하나하나 Numbering을 해준다.
      childrenList.map((item, index) => {
        const lastChild = findLastChilden(item.TOCID);
        // indexList에 새로운 객체를 넣는다.
        switch (item.INDENT) {
          case 1:
            indexList[item.TOCID] = {
              Numbering: ROMAN_NUM[index + 1],
              TITLE: item.TITLE,
              lastChildIndex: lastChild,
            };
            break;
          case 2:
            indexList[item.TOCID] = {
              Numbering: `${index + 1})`,
              TITLE: item.TITLE,
              lastChildIndex: lastChild,
            };
            break;
          case 3:
            indexList[item.TOCID] = {
              Numbering: `${HANGLE_NUM[index + 1]}.`,
              TITLE: item.TITLE,
              lastChildIndex: lastChild,
            };
            break;
          case 4:
            indexList[item.TOCID] = {
              Numbering: `${CIRCLE_NUM[index + 1]}.`,
              TITLE: item.TITLE,
              lastChildIndex: lastChild,
            };
            break;
          case 5:
            indexList[item.TOCID] = {
              Numbering: `${index + 1})`,
              TITLE: item.TITLE,
              lastChildIndex: lastChild,
            };
            break;
          default:
            indexList[item.TOCID] = {
              Numbering: `${indexList[item.PRNT_TOCID].Numbering}.${
                index + 1
              })`,
              TITLE: item.TITLE,
              lastChildIndex: lastChild,
            };
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
  findChildrenList("root");
  return indexList;
};
