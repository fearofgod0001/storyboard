import React, { useState, useEffect } from "react";
import Tree from "rc-tree";
import update from "immutability-helper";
import "rc-tree/assets/index.css";
import { Input } from "antd";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import "./popover.css";
import { StyledWrapTree } from "./styled";

export const RayRcTree = (props) => {
  const {
    treeData = undefined,
    rootId,
    keyField,
    parentKeyField,
    titleField,
    onDrop,
    onCheck,
    checkStrictly,
    onSelectTreeNode,
    isModify,
    defaultExpandAll,
    defaultShowLvL = 1,
    autoExpandParent,
    isSearch = true,
    draggable,
    checkable,
    expandAction,
    onAddTreeNode,
    onDeleteTreeNode,
    onUpdateTreeNode,
    renderUserNode,
    userIcon,
  } = props;

  const [rcTreeData, setData] = useState();
  const [inExpendKeys, setExpendKeys] = useState();
  const [onModify, setOnModify] = useState(false);
  const [selectedNode, setSelectedNode] = useState();
  const initTreeData = (data) => {
    const nData = makeTreeData(
      data?.map((item) => ({ userData: { ...item }, display: true })),
      rootId,
      keyField,
      parentKeyField,
      titleField,
      isModify
    );
    setData(nData);
  };

  const onDefaultLvL = () => {
    if (treeData) {
      const keys = treeData
        .filter((f) => f.LVL < defaultShowLvL)
        .map((item) => item[keyField]);
      setExpendKeys(keys);
    }
  };

  const initExpendAll = () => {
    if (treeData) {
      const keys = treeData.map((item) => item[keyField]);
      setExpendKeys([...keys]);
    }
  };

  useEffect(() => {
    if (treeData && treeData.length > 0) {
      initTreeData(treeData);
    }
  }, [treeData]);

  useEffect(() => {
    defaultExpandAll ? initExpendAll() : onDefaultLvL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData]);

  useEffect(() => {
    initTreeData(treeData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData, onModify]);

  const makeTreeData = (
    inputList = [],
    rootId = 0,
    keyField,
    parentKeyField,
    titleField,
    isModify
  ) => {
    if (inputList.length > 0) {
      const tree = inputList
        .filter((f) => f.display)
        .map((node) => node.userData);
      const rootNode = tree?.find((f) => f[keyField] === rootId);
      if (rootNode) {
        const makeChildren = (
          tree,
          parentIdx,
          keyField,
          parentKeyField,
          titleField,
          isModify
        ) => {
          const childrenList = tree.filter(
            (f) => f[keyField] !== rootId && f[parentKeyField] === parentIdx
          );
          if (childrenList.length > 0) {
            return childrenList.map((item) => ({
              key: item[keyField],
              // title: onModify ? renderTitleModify(item, titleField) : renderTitle(item, titleField),
              title: renderTitle(item, titleField),
              value: item[keyField],
              userData: { ...item },
              children:
                makeChildren(
                  tree,
                  item[keyField],
                  keyField,
                  parentKeyField,
                  titleField,
                  isModify
                ) || [],
            }));
          }
          return [];
        };
        return [
          {
            key: rootNode[keyField],
            value: rootNode[keyField],
            title: renderTitle(rootNode, titleField),
            userData: { ...rootNode },
            expanded: true,
            children:
              makeChildren(
                tree,
                rootNode[keyField],
                keyField,
                parentKeyField,
                titleField,
                isModify
              ) || [],
          },
        ];
      }
    }
    return [];
  };

  const onRcDrop = (info) => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...rcTreeData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      if (info.dropToGap) {
        const pantId = info.node.userData[parentKeyField];
        dragObj = {
          ...item,
          userData: { ...item.userData, [parentKeyField]: pantId },
        };
      } else {
        const pantId = info.node.userData[keyField];
        dragObj = {
          ...item,
          userData: { ...item.userData, [parentKeyField]: pantId },
        };
      }
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    typeof onDrop === "function" && onDrop(flatTreeData(data));
  };

  const onInnerSelectTreeNode = (index, node) => {
    typeof onSelectTreeNode === "function" && onSelectTreeNode(index, node);
  };

  const onSearch = (value, titleField, keyField, parentKeyField) => {
    const searchProc = (target, val) => {
      const regExp = /[\{\}\[\]\/?.,;:|\\)*~`!^\\_+<>@\#$%&\\\\=\(\'\"]/gi;
      const result = target.match(new RegExp(val.replace(regExp, ""), "i"));
      return result;
    };

    const tmp = {};
    const ptmp = [];
    Object.keys(treeData).forEach((idx) => {
      let nodeId = treeData[idx][keyField];
      let pid =
        treeData[idx][keyField] === rootId
          ? rootId
          : treeData[idx][parentKeyField];

      const searchVal = searchProc(treeData[idx][titleField], value);
      tmp[nodeId] = {
        userData: {
          ...treeData[idx],
          [parentKeyField]:
            rootId === treeData[idx][keyField]
              ? rootId
              : treeData[idx][parentKeyField],
        },
        display: nodeId === rootId,
        sortSq: treeData[idx].SORT_SQ,
      };

      if (searchVal !== null) {
        let sValue = treeData[idx][titleField].replace(
          searchVal[0],
          `<span style="background:#4854c4;color: #fff;">${searchVal[0]}</span>`
        );
        tmp[nodeId] = {
          userData: {
            ...treeData[idx],
            [titleField]: sValue,
            [parentKeyField]:
              rootId === treeData[idx][keyField]
                ? rootId
                : treeData[idx][parentKeyField],
          },
          display: searchVal !== null,
          sortSq: treeData[idx].SORT_SQ,
        };
        ptmp.push(pid);
      }
    });

    [...ptmp].forEach((pidx, i) => {
      tmp[pidx] = {
        userData: { ...tmp[pidx].userData },
        display: true,
        sortSq: tmp[pidx].userData.SORT_SQ,
      };
      let pId = tmp[pidx]?.userData[parentKeyField];

      while (pId !== rootId) {
        tmp[pId] = {
          userData: { ...tmp[pId].userData },
          display: true,
          sortSq: tmp[pId].userData.SORT_SQ,
        };
        pId = tmp[pId]?.userData[parentKeyField];
      }
    });

    const result = [];
    Object.keys(tmp).forEach((key) => {
      result.push(tmp[key]);
    });

    const nTree = makeTreeData(
      result.sort((a, b) => a.sortSq - b.sortSq),
      rootId,
      keyField,
      parentKeyField,
      titleField,
      isModify,
      onUpdateTreeNode,
      onDeleteTreeNode
    );
    setData(update(rcTreeData, { $set: nTree }));
    setExpendKeys(
      update(inExpendKeys, {
        $set: result
          .filter((f) => f.display)
          .map((item) => item.userData[keyField]),
      })
    );
  };

  const onEvtExpand = (expKeys) => {
    setExpendKeys(expKeys);
  };

  const MENU_ID = "treeContext";

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleContextMenu = (e, menu) => {
    console.debug("menu ==>", menu);
    show({ event: e });
    setSelectedNode(menu);
  };

  const onEditTreeNode = () => {
    setOnModify(false);
    onUpdateTreeNode(selectedNode);
  };

  const onDleteTreeNode = () => {
    setOnModify(false);
    onDeleteTreeNode(selectedNode);
  };

  const renderTitle = (item, titleField) => {
    return typeof renderUserNode === "function" ? (
      renderUserNode(item, titleField)
    ) : (
      <div>
        <div onContextMenu={(e) => handleContextMenu(e, item)}>
          <span dangerouslySetInnerHTML={{ __html: item[titleField] }}></span>
        </div>
      </div>
    );
  };

  return (
    <StyledWrapTree>
      {isSearch && (
        <div className="sch-panel">
          <Input.Search
            onChange={(e) =>
              onSearch(e.target.value, titleField, keyField, parentKeyField)
            }
            allowClear
          />
        </div>
      )}
      <div className="tree-body">
        <Menu
          id={MENU_ID}
          animation={{ enter: "scale", exit: "fade" }}
          theme="dark"
          style={{ minWidth: "120px" }}
        >
          <Item
            id="editDept"
            onClick={onEditTreeNode}
            style={{ fontSize: "14px" }}
          >
            <i class="fa-solid fa-hammer" style={{ marginRight: "7px" }}></i>
            편집
          </Item>

          <Item
            id="addDept"
            onClick={() => onAddTreeNode(selectedNode)}
            style={{ fontSize: "14px" }}
          >
            <i
              class="fa-solid fa-square-plus"
              style={{ marginRight: "7px" }}
            ></i>
            추가
          </Item>

          {selectedNode && selectedNode.CODE_ID !== rootId && (
            <Item
              id="deleteDept"
              onClick={onDleteTreeNode}
              style={{ fontSize: "14px" }}
            >
              <i
                class="fa-solid fa-square-minus"
                style={{ marginRight: "7px" }}
              ></i>{" "}
              삭제
            </Item>
          )}
        </Menu>
        {rcTreeData && (
          <Tree
            className="tree"
            treeData={rcTreeData}
            checkable={checkable}
            onSelect={onInnerSelectTreeNode}
            expandAction={expandAction}
            autoExpandParent={autoExpandParent}
            draggable={draggable}
            expandedKeys={inExpendKeys}
            onExpand={onEvtExpand}
            onDrop={onRcDrop}
            onCheck={onCheck}
            icon={userIcon}
            checkStrictly={checkStrictly}
          />
        )}
      </div>
    </StyledWrapTree>
  );
};

export const appendTreeData = (
  childList,
  addNodeInfo,
  keyField,
  parentKeyField,
  titleField
) => {
  return childList.map((item) =>
    item.node[keyField] === addNodeInfo[parentKeyField]
      ? {
          ...item,
          children: [
            {
              key: addNodeInfo[keyField],
              value: addNodeInfo[keyField],
              title: item[titleField],
              userData: { ...addNodeInfo },
            },
            ...item.children,
          ],
        }
      : { ...item, children: [appendTreeData(item.children, addNodeInfo)] }
  );
};

export const flatTreeData = (inputList) => {
  let lvl = 1;
  const treeData = [];
  const flatDeep = (ary, lvl) => {
    if (Array.isArray(ary)) {
      ary.forEach((item) => {
        treeData.push({ ...item.userData, LVL: lvl });
        item.children.length > 0 && flatDeep(item.children, lvl + 1);
      });
    }
    return;
  };
  flatDeep(inputList, lvl);
  return treeData;
};

export const makeRcTreeData = (
  inputList = [],
  rootId = 0,
  keyField,
  parentKeyField,
  titleField
) => {
  let rootNode;
  if (rootId === -1) {
    rootNode = { CODE_ID: -1 };
  } else {
    rootNode = inputList.find((f) => f[keyField] === rootId);
  }

  if (rootNode) {
    const makeChildren = (
      inputList,
      parentIdx,
      keyField,
      parentKeyField,
      titleField
    ) => {
      const childrenList = inputList.filter(
        (f) => f[keyField] !== rootId && f[parentKeyField] === parentIdx
      );
      if (childrenList.length > 0) {
        return childrenList.map((item) => ({
          key: item[keyField],
          title: item[titleField],
          value: item[keyField],
          userData: { ...item },
          children: makeChildren(
            inputList,
            item[keyField],
            keyField,
            parentKeyField,
            titleField
          ),
        }));
      }
      return [];
    };

    return [
      {
        key: rootNode[keyField],
        value: rootNode[keyField],
        title: rootNode[titleField],
        userData: { ...rootNode },
        children: makeChildren(
          inputList,
          rootNode[keyField],
          keyField,
          parentKeyField,
          titleField
        ),
      },
    ];
  }
  return [];
};

export default RayRcTree;
