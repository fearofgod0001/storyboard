import { useState, useRef, useEffect } from "react";
import { StyledRayDragTab } from "./styled";
import { TabLabel } from "./tab-label";
import { Popconfirm } from "antd";

export const DragTab = ({
  label,
  tabKey,
  index,
  selectedIndex,
  onComplete,
  onRemoveTab,
  onSelectedTab,
  onChangeLabel,
}) => {
  const [isEdit, setEdit] = useState(false);
  const tabRef = useRef(null);

  const onTabDoubleClick = () => {
    setEdit(true);
  };

  //엔터 클릭시 이름변경 해제
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setEdit(false);
      onComplete();
    }
  };

  const onChangeEditLabel = (value) => {
    onChangeLabel(value, index, tabKey);
  };

  useEffect(() => {
    if (isEdit) {
      function onClickOutside(event) {
        if (tabRef.current && !tabRef.current.contains(event.target)) {
          // 다른 영역을 클릭한 경우에만 동작을 수행합니다.
          setEdit(false);
          onComplete();
        }
      }
      document.addEventListener("click", onClickOutside);
      return () => {
        document.removeEventListener("click", onClickOutside);
      };
    }
  }, [isEdit, onComplete]);

  return (
    <StyledRayDragTab>
      <div
        className="tab-label-panel"
        ref={tabRef}
        onClick={() => onSelectedTab(index, tabKey)}
        onDoubleClick={() => onTabDoubleClick()}
      >
        {isEdit ? (
          <div className="labelName">
            <TabLabel
              placeholder="tab name"
              value={label}
              isFocus={isEdit}
              onChange={onChangeEditLabel}
              onKeyDowns={onKeyDown}
            />
          </div>
        ) : (
          <div className="labelName">{label || "no title"}</div>
        )}
      </div>

      <Popconfirm
        title="삭제하시겠습니까?"
        placement="bottom"
        onConfirm={() => onRemoveTab(index, tabKey)}
        okText="Yes"
        cancelText="No"
      >
        <div className="btn-remove">
          <i className="fa-solid fa-xmark"></i>
        </div>
      </Popconfirm>
    </StyledRayDragTab>
  );
};
