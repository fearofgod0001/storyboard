import { useEffect, useState, useRef } from "react";
import { DragTab } from "./drag-tab";
import { StyledRayTab } from "./styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import update from "immutability-helper";
import { StyledButton } from "../styledElement";

export const RayTab = ({
  tabList,
  selectedIndex,
  onChange,
  onSelectedTab,
  onDragEnd,
  onAddTab,
  onRemoveTab,
  onSave,
}) => {
  const [_tabList, setTabList] = useState();
  const [_selectedIndex, setSelectedIndex] = useState(0);
  const [isOverFlow, setIsOverFlow] = useState();

  const containerRef = useRef(null);
  const autoDragRef = useRef(null);

  useEffect(() => {
    if (selectedIndex) {
      setSelectedIndex(selectedIndex);
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (tabList) {
      setTabList(tabList);
    }
  }, [tabList]);

  useEffect(() => {
    if (_tabList && JSON.stringify(_tabList) !== JSON.stringify(tabList)) {
      onChange(_tabList);
    }

    //overFLow 를 감지한다.
    const container = containerRef.current;

    if (container) {
      const _isOverFlow = container.scrollWidth > container.clientWidth;
      setIsOverFlow(_isOverFlow);
      if (_isOverFlow) {
        autoDragRef[_tabList.length - 1].scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [_tabList, onChange]);

  const _onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const dragIdx = result.source.index;
    const destIdx = result.destination.index;

    setTabList((prev) => {
      const nTab = prev[dragIdx];
      return update(prev, {
        $splice: [
          [dragIdx, 1],
          [destIdx, 0, { ...nTab }],
        ],
      });
    });
    setSelectedIndex(destIdx);
    onSelectedTab(destIdx, result.draggableId);
    typeof onDragEnd === "function" && onDragEnd(dragIdx, destIdx);
  };

  const onChangeLabel = (text, index, tabKey) => {
    setTabList((prev) =>
      update(prev, {
        [index]: { LABEL: { $set: text } },
      })
    );
  };

  // const onComplete = () => {
  //   onChange(_tabList);
  // };

  const _onSelectedTab = (index, tabKey) => {
    //ref로 스크롤이 이동함
    autoDragRef[index].scrollIntoView({ behavior: "smooth" });
    setSelectedIndex(index);
    onSelectedTab(index, tabKey);
  };

  const _onAddTab = () => {
    const idx = _tabList.length;
    setSelectedIndex(idx);
    onAddTab(idx);
  };

  const _onRemoveTab = (index, tabKey) => {
    if (_selectedIndex === index) {
      const endPos = _tabList.length - 1;
      if (endPos > index) {
        setSelectedIndex(index);
      } else {
        const nIdx = index - 1;
        console.debug(" endPos == ", nIdx);
        setSelectedIndex(nIdx);
        onSelectedTab(index, tabKey);
      }
    }
    onRemoveTab(index, tabKey);
  };

  const onShowTabList = () => {
    console.debug("onShowTabList");
  };

  return (
    <StyledRayTab>
      <div className="content-panel">
        <div className="tab-panel" ref={containerRef}>
          <DragDropContext onDragEnd={_onDragEnd}>
            <Droppable droppableId="_tabsInfo" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="drop-panel"
                >
                  {_tabList &&
                    _tabList.map((tab, index) => (
                      <Draggable
                        key={tab.TAB_KEY}
                        index={index}
                        draggableId={tab.TAB_KEY}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={`dragtab-panel ${
                                _selectedIndex === index && "on"
                              }`}
                            >
                              <div
                                className="dragtab-top"
                                ref={(el) => (autoDragRef[index] = el)}
                              ></div>
                              <DragTab
                                key={`dragitem-${index}`}
                                index={index}
                                selectedIndex={_selectedIndex}
                                label={tab.LABEL}
                                tabKey={tab.TAB_KEY}
                                onSelectedTab={_onSelectedTab}
                                onRemoveTab={_onRemoveTab}
                                onChangeLabel={onChangeLabel}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {isOverFlow && isOverFlow === true && (
          <div className="showInvisibleTab" onClick={onShowTabList}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        )}

        <div className="tabItemPlus" onClick={_onAddTab}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="btn-panel">
        <StyledButton className="btn-primary" onClick={onSave}>
          저장
        </StyledButton>
      </div>
    </StyledRayTab>
  );
};
