import { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import { flatTreeData, makeTreeByflatData } from "../../tree-helper";
import { Tree } from "antd";
import StyledTree from "./styled";

const AntdTree = StyledTree(Tree);

const EditTree = ({ w, h, tocListAsTree, onChangeTree, numberingList }) => {
  const [gData, setGData] = useState();
  const treeRef = useRef();
  const [treeKey, setTreeKey] = useState(uuid());
  useEffect(() => {
    if (tocListAsTree) {
      const nTocList = makeTreeByflatData(tocListAsTree);
      setGData(nTocList);
    } else {
      setGData([]);
    }
  }, [tocListAsTree]);

  useEffect(() => {
    if (gData) {
      setTreeKey(uuid());
    }
  }, [gData]);

  const onDrop = (info) => {
    console.debug(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      // Has children
      info.node.props.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
    const fdata = flatTreeData([...data]);
    onChangeTree(fdata);
  };

  return (
    <AntdTree
      ref={treeRef}
      key={treeKey}
      className="draggable-tree"
      defaultExpandAll
      autoExpandParent
      blockNode
      draggable={{ icon: false }}
      showLine
      onDrop={onDrop}
      treeData={gData}
      titleRender={(item) => (
        <div style={{ cursor: "move" }}>
          {numberingList[item.key] && numberingList[item.key].Numbering}{" "}
          {item.title}
        </div>
      )}
    />
  );
};

export default EditTree;
