import { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import { StyledRayDragTab } from "./styled";
import { TabLabel } from "./tab-label";

// const AutoWidthInput = ({ value, onChange }) => {
//   return (
//     <div>
//       <StyledInput placeholder="이름 또는 애칭" spellCheck={false} contentEditable />
//     </div>
//   );
// };

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
  }, [isEdit]);

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
              onChange={onChangeEditLabel}
              onKeyDowns={onKeyDown}
            />
            {/* <Input
              placeholder="tab name"
              ref={inputRef}
              value={label}
              style={{ width: `${label?.length * 10}px`, minWidth: '50px' }}
              onChange={onChangeEditLabel}
              onBlur={onBlur}
              onKeyDown={OnKeyDown}
            /> */}
          </div>
        ) : (
          <div className="labelName">{label || "no title"}</div>
        )}
      </div>

      <div className="btn-remove" onClick={() => onRemoveTab(index, tabKey)}>
        <i class="fa-solid fa-xmark"></i>
      </div>
    </StyledRayDragTab>
  );
};
