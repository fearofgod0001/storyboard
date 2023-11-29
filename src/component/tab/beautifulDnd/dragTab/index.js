import { useState, useRef } from "react";
import { Input } from "antd";
import { StyledRayDragTab } from "./styled";

export const DragTab = ({ tab, index, tabRemove, onChange, selectIndex }) => {
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

  return index === changeIndex ? (
    <StyledRayDragTab>
      <Input
        value={editedLabel}
        style={{ width: `${editedLabel.length * 10}px`, minWidth: "100px" }}
        onChange={(e) => setEditedLabel(e.target.value)}
        onBlur={onBlur}
        onKeyDown={handleOnKeyDown}
      />
    </StyledRayDragTab>
  ) : (
    <StyledRayDragTab active={selectIndex === index}>
      <div
        className="dragTabZone"
        ref={ref}
        onClick={() => onChange(tab.TAB_KEY)}
      >
        <div className="hoverTopBorder"> </div>
        <div style={{ display: "flex", marginBottom: "8px", marginTop: "8px" }}>
          <div
            className="labelName"
            onDoubleClick={() => handleTabClick(index)}
          >
            {tab.LABEL}
          </div>
          <div className="removeButton" onClick={tabRemove}>
            x
          </div>
        </div>
      </div>
    </StyledRayDragTab>
  );
};
