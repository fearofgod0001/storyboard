import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { StyledRayTab } from "./styled";
import { DragTab } from "./dragTab";

const RayTab = ({ value, onChange, tabAdd, tabRemove }) => {
  const [_tabsInfo, setTabsInfo] = useState();
  const [selectIndex, setSelectIndex] = useState("all");

  useEffect(() => {
    if (value) {
      setTabsInfo(value);
    }
  }, [value]);

  const onDragEnd = (result) => {
    console.debug(result);
    if (!result.destination) {
      return;
    }

    const reorderedTabs = Array.from(_tabsInfo);
    const [movedTab] = reorderedTabs.splice(result.source.index, 1);
    reorderedTabs.splice(result.destination.index, 0, movedTab);
    setTabsInfo(reorderedTabs);
  };

  const onSelectIndex = (index) => {
    setSelectIndex(index);
  };

  return (
    <StyledRayTab>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="_tabsInfo" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="horizontal-tabs-container"
            >
              {_tabsInfo &&
                _tabsInfo.map((tab, index) => (
                  <Draggable
                    key={tab.TAB_KEY}
                    draggableId={tab.TAB_KEY}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className="clickDragTab"
                          onClick={() => onSelectIndex(index)}
                        >
                          <DragTab
                            onChange={onChange}
                            selectTabKey={tab.TAB_KEY}
                            tab={tab}
                            index={index}
                            tabRemove={tabRemove}
                            selectIndex={selectIndex}
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
      <div className="tabItemPlus" onClick={tabAdd}>
        +
      </div>
    </StyledRayTab>
  );
};

export default RayTab;
