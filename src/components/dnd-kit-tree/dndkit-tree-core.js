import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  MeasuringStrategy,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

import {
  buildTree,
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty,
} from './utilities';

import { SortableTreeItem } from './components/TreeItem/SortableTreeItem';
import { message } from 'antd';

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const dropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.2,
};

export function DndKitTreeCore({
  treeData,
  indicator,
  numberingList,
  indentationWidth = 20,
  removable,
  allowMultiRoot = false,
  onChange,
  onClickTreeNode,
  onRenderIcon,
  onRenderTitle,
  onContextMenu,
}) {
  const [items, setItems] = useState(treeData);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (treeData) {
      setItems(treeData);
    }
  }, [treeData]);

  const flattenedItems = useMemo(() => {
    if (items && items.length > 0) {
      const flattenedTree = flattenTree(items?.map((i) => ({ ...i, isLast: [] })));
      const collapsedItems = flattenedTree.reduce(
        (acc, { children, collapsed, id }) => (collapsed && children.length ? [...acc, id] : acc),
        []
      );
      return removeChildrenOf(flattenedTree, activeId ? [activeId, ...collapsedItems] : collapsedItems);
    }
  }, [activeId, items]);

  const projected =
    activeId && overId
      ? getProjection(flattenedItems, activeId, overId, offsetLeft, indentationWidth, allowMultiRoot)
      : null;

  const sensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const sortedIds = useMemo(() => flattenedItems?.map(({ id }) => id), [flattenedItems]);
  const activeItem = activeId ? flattenedItems?.find(({ id }) => id === activeId) : null;

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft,
    };
  }, [flattenedItems, offsetLeft]);

  const announcements = {
    onDragStart(id) {
      return `Picked up ${id}.`;
    },
    onDragMove(id, overId) {
      return getMovementAnnouncement('onDragMove', id, overId);
    },
    onDragOver(id, overId) {
      return getMovementAnnouncement('onDragOver', id, overId);
    },
    onDragEnd(id, overId) {
      return getMovementAnnouncement('onDragEnd', id, overId);
    },
    onDragCancel(id) {
      return `Moving was cancelled. ${id} was dropped in its original position.`;
    },
  };

  return (
    sortedIds && (
      <DndContext
        announcements={announcements}
        sensors={sensors}
        collisionDetection={closestCenter}
        measuring={measuring}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
          {flattenedItems.map(({ id, title, isDrag, children, collapsed, depth, isLast, lineType, data }) => {
            return (
              <SortableTreeItem
                id={id}
                numberingListItem={numberingList[id]}
                title={title}
                depth={id === activeId && projected ? projected.depth : depth}
                isDrag={isDrag}
                isDroppable={projected ? projected.isDroppable : true}
                isLast={isLast}
                lineType={lineType}
                childCount={children.length}
                data={data}
                indentationWidth={indentationWidth}
                indicator={indicator}
                collapsed={Boolean(collapsed && children.length)}
                onCollapse={children.length ? () => handleCollapse(id) : undefined}
                onRemove={removable ? () => handleRemove(id) : undefined}
                onRenderIcon={onRenderIcon}
                onClickTreeNode={onClickTreeNode}
                onRenderTitle={onRenderTitle}
                onContextMenu={onContextMenu}
              />
            );
          })}
          {createPortal(
            <DragOverlay dropAnimation={dropAnimation} modifiers={indicator ? [adjustTranslate] : undefined}>
              {activeId && activeItem ? (
                <SortableTreeItem
                  id={activeId}
                  title={activeItem.title}
                  depth={activeItem.depth}
                  isDroppable={projected ? projected.isDroppable : true}
                  clone
                  childCount={getChildCount(items, activeId)}
                  value={activeId}
                  indentationWidth={indentationWidth}
                  onRenderIcon={() =>
                    typeof onRenderIcon === 'function' &&
                    onRenderIcon(activeItem?.data, false, getChildCount(items, activeId))
                  }
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </SortableContext>
      </DndContext>
    )
  );

  function handleDragStart({ active: { id: activeId } }) {
    setActiveId(activeId);
    setOverId(activeId);

    const activeItem = flattenedItems.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId,
      });
    }

    document.body.style.setProperty('cursor', 'grabbing');
  }

  function handleDragMove({ delta }) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver({ over }) {
    setOverId(over?.id ?? null);
  }

  function handleDragEnd({ active, over }) {
    resetState();
    if (projected && over) {
      const { depth, parentId, isDroppable } = projected;

      const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
      // if (!isDroppable) {
      //   message.warning('이동을 할 수 없는 항목입니다.');
      //   return;
      // }

      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];
      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const newItems = buildTree(sortedItems);
      typeof onChange === 'function' && sortedItems?.length > 0 && onChange(sortedItems);
      setItems(newItems);
    }
  }

  function handleDragCancel() {
    resetState();
  }

  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    document.body.style.setProperty('cursor', '');
  }

  function handleRemove(id) {
    setItems((items) => removeItem(items, id));
  }

  function handleCollapse(id) {
    setItems((items) =>
      setProperty(items, id, 'collapsed', (value) => {
        return !value;
      })
    );
  }

  function getMovementAnnouncement(eventName, activeId, overId) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (currentPosition && projected.parentId === currentPosition.parentId && overId === currentPosition.overId) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          });
        }
      }

      const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)));
      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }
}

const adjustTranslate = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25,
  };
};
