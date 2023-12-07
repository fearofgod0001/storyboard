import { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Input } from "antd";

const DragPanel = ({ tab, index, onMoveContent }) => {
  const [editedLabel, setEditedLabel] = useState(tab.LABEL);
  const [changeIndex, setChangeIndex] = useState();
  const ref = useRef(null);
  //더블클릭시 이름 변경 실행
  const handleTabClick = (index) => {
    setChangeIndex(index);
  };
  //아웃 포커싱될 때 이름변경 해제
  const onBlur = () => {
    setChangeIndex();
    setEditedLabel(tab.LABEL);
  };
  //엔터 클릭시 이름변경 해제
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      setChangeIndex();
      tab.LABEL = editedLabel;
    }
  };

  const [{ isDragging }, drag, previewRef] = useDrag(() => {
    return {
      type: "content-item",
      item: { activeType: "content-item", index },
      // end: (item, monitor) => {
      //   const didDrop = monitor.didDrop();
      //   const dragIndex = item.index;
      //   const hoverIndex = index;
      //   console.debug('drag', dragIndex, hoverIndex);
      //   if (!didDrop) {
      //     moveContent(dragIndex, hoverIndex);
      //   }
      //   item.index = hoverIndex;
      // },
      collect: (monitor) => {
        return { isDragging: monitor.isDragging() };
      },
    };
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "content-item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();

      // console.debug('drop monitor', monitor);
      console.debug("drop cliend Offset", clientOffset);
      console.debug(
        "drop getBoundingClientRect right",
        hoverBoundingRect.right
      );

      if (!clientOffset) {
        return null;
      }
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      console.debug("drop", dragIndex, hoverIndex);
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        onMoveContent(dragIndex, hoverIndex);
      }

      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.3 : 1;
  drag(drop(ref));

  return index === changeIndex ? (
    <Input
      value={editedLabel}
      style={{ width: `${editedLabel.length * 10}px`, minWidth: "100px" }}
      onChange={(e) => setEditedLabel(e.target.value)}
      onBlur={onBlur}
      onKeyDown={handleOnKeyDown}
    />
  ) : (
    <div ref={previewRef} style={{ opacity: isDragging ? "0.3" : "1" }}>
      <div
        style={{ opacity }}
        data-handler-id={handlerId}
        ref={ref}
        onDoubleClick={() => handleTabClick(index)}
      >
        {tab.LABEL}
      </div>
    </div>
  );
};

export default DragPanel;
