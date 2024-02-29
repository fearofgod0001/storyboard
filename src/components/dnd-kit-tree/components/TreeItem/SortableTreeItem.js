import React, { CSSProperties } from 'react';
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TreeItem } from './TreeItem';

const animateLayoutChanges = ({ isSorting, wasDragging }) => (isSorting || wasDragging ? false : true);

export function SortableTreeItem({
  id,
  title,
  overParentId,
  depth,
  isDrag,
  isDroppable,
  isLast,
  lineType,
  data,
  onRenderIcon,
  onClickTreeNode,
  onRenderTitle,
  onContextMenu,
  numberingListItem,
  ...props
}) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled: !isDrag,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    width: 'fit-content',
    backgdoundColor: depth % 2 === 0 ? '#ffffff' : '#efefef',
  };

  return (
    <TreeItem
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      numberingListItem={numberingListItem}
      style={style}
      depth={depth}
      overParentId={overParentId}
      lineType={lineType}
      isLast={isLast}
      isDroppable={isDroppable}
      id={id}
      title={title}
      ghost={isDragging}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      data={data}
      onRenderIcon={onRenderIcon}
      onClickTreeNode={onClickTreeNode}
      onRenderTitle={onRenderTitle}
      onContextMenu={onContextMenu}
      {...props}
    />
  );
}
