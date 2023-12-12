import { useEffect, useState, useRef } from "react";
import { DragTab } from "./drag-tab";
import { StyledRayTab } from "./styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import update from "immutability-helper";
import debounce from "lodash/debounce";
import { StyledButton } from "../styledElement";
import { Dropdown } from "antd";

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
  const [_overFLowList, setOverFlowList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

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

  //디바운스
  const debouncehandleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 300);

  useEffect(() => {
    if (_tabList && JSON.stringify(_tabList) !== JSON.stringify(tabList)) {
      onChange(_tabList);
    }
    const container = containerRef.current;
    if (_overFLowList.length > 0) {
      autoDragRef[_selectedIndex]?.scrollIntoView({ behavior: "smooth" });
    }
    //각 value의 x값의 위치를 구하여 overflow되면 list에 넣는다.
    const overFLowList = [];
    Object.values(autoDragRef).map((item, index) => {
      const tabX = item?.getBoundingClientRect().x;
      if (tabX < 10 || tabX > container.clientWidth - 30) {
        overFLowList.push({
          index: index,
          label: item.innerText,
          key: _tabList[index].TAB_KEY,
        });
      }
    });
    setOverFlowList(overFLowList);

    console.debug("windowSize", windowSize);
  }, [_tabList, windowSize]);

  //계속 새로운 핸들러로 만들고 unmount시 제거해준다
  useEffect(() => {
    window.addEventListener("resize", debouncehandleResize);
    return () => {
      window.removeEventListener("resize", debouncehandleResize);
    };
  }, []);

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
    autoDragRef[_selectedIndex].scrollIntoView({ behavior: "smooth" });
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

  return (
    <StyledRayTab>
      <div className="content-panel">
        <div className="tab-panel" ref={containerRef}>
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
                          >
                            <div
                              className={`dragtab-panel ${
                                _selectedIndex === index && "on"
                              }`}
                              ref={(el) => (autoDragRef[index] = el)}
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

        {_overFLowList?.length > 0 && (
          <div className="showInvisibleTab" onClick={onShowTabList}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        )}

        <div className="overFlowDropDown">
          {isOpen === true &&
            _overFLowList.map((item, index) => {
              return (
                <div
                  className="dropDowmItem"
                  key={index}
                  onClick={() => _onSelectedTab(item.index, item.key)}
                >
                  {item.label}
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
