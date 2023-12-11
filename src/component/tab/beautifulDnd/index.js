import { useEffect, useState, useRef } from "react";
import { DragTab } from "./drag-tab";
import { StyledRayTab } from "./styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import update from "immutability-helper";
import { StyledButton } from "../styledElement";
import { Dropdown, Space } from "antd";

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
  const [_overFLowList, setOverFlowList] = useState([]);

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
    // if (_tabList && JSON.stringify(_tabList) !== JSON.stringify(tabList)) {
    //   onChange(_tabList);
    // }

    //overFLow 를 감지한다.
    const container = containerRef.current;
    //overFlow시 선택한 index로 이동
    if (container) {
      const _isOverFlow = container.scrollWidth > container.clientWidth;
      setIsOverFlow(_isOverFlow);
      if (_isOverFlow) {
        autoDragRef[_selectedIndex]?.scrollIntoView({ behavior: "smooth" });
      }
    }

    //
    const overFLowList = [];

    Object.values(autoDragRef).map((item, index) => {
      const tabX = item?.getBoundingClientRect().x;
      if (tabX < 30 || tabX > container.clientWidth + 30) {
        overFLowList.push({
          index: index,
          label: item.innerText,
        });
      }
    });

    setOverFlowList(overFLowList);

    // console.debug('autoDragRef', autoDragRef[_selectedIndex]?.getBoundingClientRect());
    // //tab bar의 전체 길이를 구함
    // //autoDragRef를 map으로 돌면서 getBoundingClientRect() 값의 left가
    // //containerRef.clientWidth + 30 보다 높게
    // //tab bar의 LEFT값
    // console.debug('tab bar의 LEFT값', container.scrollLeft);
    // console.debug('선택한 TAB LEFT값', autoDragRef[_selectedIndex]?.offsetLeft);
    // //tab bar RIGHT값
    // console.debug('tab bar RIGHT값', container.clientWidth + 30);
    // console.debug('선택한 TAB RIGHT값', autoDragRef[_selectedIndex]?.offsetLeft);
  }, [window.innerWidth, _tabList]);

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

  const onComplete = () => {
    onChange(_tabList);
  };

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
    console.debug("onShowTabList", _overFLowList);
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
                            ref={(el) => (autoDragRef[index] = el)}
                            {...provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={`dragtab-panel ${
                                _selectedIndex === index && "on"
                              }`}
                            >
                              <div className="dragtab-top"></div>
                              <DragTab
                                key={`dragitem-${index}`}
                                index={index}
                                selectedIndex={_selectedIndex}
                                label={tab.LABEL}
                                tabKey={tab.TAB_KEY}
                                onSelectedTab={_onSelectedTab}
                                onRemoveTab={_onRemoveTab}
                                onChangeLabel={onChangeLabel}
                                onComplete={onComplete}
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
