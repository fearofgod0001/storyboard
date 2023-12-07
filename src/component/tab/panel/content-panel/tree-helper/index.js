import * as icons from "react-icons/md";

export const flatTreeData = (inputList) => {
  console.debug(" flatTreeData ===>", inputList);
  let lvl = 1;
  const treeData = [];
  const flatDeep = (ary, prntId, lvl) => {
    if (Array.isArray(ary)) {
      ary.forEach((item, i) => {
        treeData.push({ key: item.key, prntId, lvl });
        item &&
          item.children &&
          item.children.length > 0 &&
          flatDeep(item.children, item.key, lvl + 1);
      });
    }
    return;
  };
  flatDeep(inputList, "root", lvl);
  return treeData;
};

export const makeTreeByflatData = (tocList) => {
  const rootTocList = tocList?.filter((f) => f.PRNT_TOCID === "root");
  return rootTocList?.map((rootToc) => {
    const makeChildren = (mList, prntTocId) => {
      const childrenList = mList.filter((f) => f.PRNT_TOCID === prntTocId);
      return childrenList.map((toc) => ({
        key: String(toc.TOCID),
        title: toc.TITLE ? toc.TITLE : "목차명을 입력해 주세요",
        icon: icons.MdAccessTime,
        data: {},
        children:
          mList.filter((f) => f.PRNT_TOCID === toc.TOCID).length > 0
            ? makeChildren(mList, toc.TOCID)
            : [],
      }));
    };

    return {
      key: String(rootToc.TOCID),
      title: rootToc.TITLE ? rootToc.TITLE : "목차명을 입력해 주세요",
      icon: icons.MdAccessTime,
      data: {},
      children:
        tocList.filter((f) => f.PRNT_TOCID === rootToc.TOCID).length > 0
          ? makeChildren(tocList, rootToc.TOCID)
          : [],
    };
  });
};
