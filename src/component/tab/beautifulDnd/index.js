import { useEffect, useState } from "react";
import { StyledRayTab } from "./styled";
import { DragTab } from "./dragTab";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import update from "immutability-helper";

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

  console.debug(tabList);

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
    setSelectedIndex(index);
    onSelectedTab(index, tabKey);
  };

  const _onAddTab = () => {
    const idx = _tabList.length;
    setSelectedIndex(idx);
    onAddTab(idx);
  };

  const _onRemoveTab = (index, tabKey) => {
    console.debug("_onRemoveTab", index, tabKey);
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

  return (
    <StyledRayTab>
      <div className="tab-panel">
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
        <div className="tabItemPlus" onClick={_onAddTab}>
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="btn-panel">
        <button onClick={onSave}>저장</button>
      </div>
    </StyledRayTab>
  );
};
