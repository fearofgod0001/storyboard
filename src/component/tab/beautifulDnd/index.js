import { useEffect, useState, useRef } from "react";
import { DragTab } from "./drag-tab";
import { StyledRayTab } from "./styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import update from "immutability-helper";
import debounce from "lodash/debounce";
import { StyledButton } from "../styledElement";
import { Dropdown } from "antd";
import uuid from "react-uuid";

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
  const [overFlowList, setOverFLowList] = useState();
  const [_selectedIndex, setSelectedIndex] = useState(0);
  const [isOverFlow, setIsOverFlow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [isScroll, setScroll] = useState();

  const containerRef = useRef(null);
  const tabItemRef = useRef([]);
  const tabRef = useRef(null);

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

  //innerWidth를 0.3초마다 변경하는 디바운스
  const debouncehandleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 300);

  console.debug("실행 ");

  useEffect(() => {
    //값을 저장하는 onChange
    if (_tabList && JSON.stringify(_tabList) !== JSON.stringify(tabList)) {
      onChange(_tabList);
    }
    // //overFlow를 감지하는 setIsOverFlow
    const container = containerRef.current;

    const showTabs = containerRef.current?.childNodes[0]?.childNodes;
    const tabs = [];
    showTabs.forEach((item, index) => {
      if (
        item.getBoundingClientRect().x < 0 ||
        item.getBoundingClientRect().x > containerRef.current.clientWidth - 30
      ) {
        tabs.push({ ..._tabList[index], index });
      }
    });
    setOverFLowList([...tabs]);

    if (container) {
      const _isOverFlow = container.scrollWidth > container.clientWidth;
      setIsOverFlow(_isOverFlow);
      if (_isOverFlow) {
        showTabs[_selectedIndex]?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isScroll, _tabList]);

  useEffect(() => {
    const container = containerRef.current;
    const showTabs = containerRef.current?.childNodes[0]?.childNodes;
    if (container) {
      const _isOverFlow = container.scrollWidth > container.clientWidth;
      setIsOverFlow(_isOverFlow);
      if (_isOverFlow) {
        showTabs[_selectedIndex]?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [_tabList, windowSize]);

  //디바운스를 계속 새로운 핸들러로 만들고 unmount시 제거해준다
  useEffect(() => {
    window.addEventListener("resize", debouncehandleResize);
    containerRef?.current?.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("resize", debouncehandleResize);
      containerRef?.current?.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onScroll = debounce(() => {
    setScroll(uuid());
  }, 300);

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
    //선택한 index로로 스크롤이 이동함
    tabItemRef.current[index]?.scrollIntoView({ behavior: "smooth" });

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

  //overFlow된 tabList를 보여준다.
  const onShowTabList = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      function onClickOutsideDrop(event) {
        console.debug("event", event.target);
        if (tabRef.current && !tabRef.current.contains(event.target)) {
          console.debug("tabRef.current", tabRef.current);
          console.debug(
            "tabRef.current",
            tabRef.current.contains(event.target)
          );
          // 다른 영역을 클릭한 경우에만 동작을 수행합니다.
          // setIsOpen(false);
          // onComplete();
        }
      }
      document.addEventListener("click", onClickOutsideDrop);
      return () => {
        document.removeEventListener("click", onClickOutsideDrop);
      };
    }
  }, [isOpen]);

  return (
    <StyledRayTab>
      <div className="content-panel">
        <div id="tab-panel" className="tab-panel" ref={containerRef}>
          <DragDropContext onDragEnd={_onDragEnd}>
            <Droppable droppableId="_tabsInfo" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
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
                            // onClick={() => _onSelectedTab(tab.TAB_KEY, index)}
                          >
                            <div
                              className={`dragtab-panel ${
                                _selectedIndex === index && "on"
                              }`}
                              ref={(el) => {
                                if (el) {
                                  tabItemRef.current[index] = el;
                                }
                              }}
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
                                // onComplete={onComplete}
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

        <div className="overFlowDropDown" ref={tabRef}>
          {isOpen === true &&
            overFlowList?.map((item, _index) => {
              return (
                <div className="dropDownBox">
                  <div className="dropDown-top"></div>
                  <div
                    className="dropDowmItem"
                    key={_index}
                    onClick={() => _onSelectedTab(item.index, item.TAB_KEY)}
                  >
                    {item.LABEL ?? "no title"}
                  </div>
                </div>
              );
            })}
        </div>

        <div className="tabItemPlus" onClick={_onAddTab}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="btn-panel">
        <StyledButton className="btn-primary btn-small" onClick={onSave}>
          저장
        </StyledButton>
      </div>
    </StyledRayTab>
  );
};
