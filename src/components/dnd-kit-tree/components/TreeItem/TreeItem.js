import React, { forwardRef } from 'react';

import classNames from 'classnames';
import { PlusCircleOutlined, MinusCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Handle } from './Handle';
import { Remove } from './Remove';
import styles from './TreeItem.module.css';

export const TreeItem = forwardRef(
  (
    {
      id,
      childCount,
      clone,
      depth,
      isLast,
      lineType,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      title,
      overParentId,
      isDroppable,
      wrapperRef,
      onRenderIcon,
      onClickTreeNode,
      onRenderTitle,
      onContextMenu,
      data,
      numberingListItem,
      ...props
    },
    ref
  ) => {
    const deptPlace = [];
    for (var i = 0; i < depth; i++) {
      let _className = classNames(
        styles.rst__lineBlock
        // isLast && isLast.length > 0 && isLast[i] && styles.rst__lineFullVertical
      );
      deptPlace.push(
        <div className={_className} style={{ width: `${indentationWidth}px` }}>
          {i === depth - 1 && ghost && <RightOutlined />}
        </div>
      );
    }

    console.debug('deptPlace', ghost);
    return (
      <div
        className={classNames(ghost && styles.ghostWrap)}
        ref={wrapperRef}
        {...props}
        style={{ backgroundColor: depth % 2 === 0 ? '#ffffff' : '#efefef' }}
      >
        <div className={styles.TreeItem} ref={ref} style={style}>
          {deptPlace.map((div) => div)}
          <div className={classNames(styles.placeholder, ghost && styles.ghost)}>
            {/* <div
              className={classNames(styles.rst__lineBlock, ghost && styles.ghostHide)}
              style={{ width: `${indentationWidth}px` }}
            > */}
            {childCount > 0 ? (
              <div
                // className={classNames(
                //   lineType === 'R'
                //     ? null
                //     : lineType === 'B'
                //     ? styles.rst__handleLineHalfVerticalBottom
                //     : lineType === 'T'
                //     ? styles.rst__handleLineHalfVerticalTop
                //     : styles.rst__lineFullVertical,
                //   styles.rst__handleLineHalfHorizontalRight,
                //   clone && styles.clone,
                //   styles.handlePointer
                // )}
                onClick={onCollapse}
              >
                {!collapsed ? (
                  <MinusCircleOutlined style={{ fontSize: '13px' }} />
                ) : (
                  <PlusCircleOutlined style={{ fontSize: '13px' }} />
                )}
              </div>
            ) : (
              <div
              // className={
              //   !clone &&
              //   classNames(
              //     lineType === 'T'
              //       ? styles.rst__lineHalfVerticalTop
              //       : lineType === 'B' && depth === 0
              //       ? styles.rst__lineHalfVerticalBottom
              //       : styles.rst__lineFullVertical,
              //     styles.rst__lineHalfHorizontalRight
              //   )
              // }
              />
            )}
            {/* </div> */}

            <div
              className={classNames(
                clone ? (isDroppable ? styles.handling : styles.diableDroppable) : styles.handle,
                ghost && styles.ghostHide
              )}
            >
              <div
                className={classNames(
                  styles.rst__absoluteLineBlock
                  // !clone && childCount > 0 && !collapsed && styles.rst__handleLineHalfVerticalBottom
                )}
              >
                <Handle
                  {...handleProps}
                  onRenderIcon={onRenderIcon}
                  collapsed={collapsed}
                  data={data}
                  childCount={childCount}
                  numberingListItem={numberingListItem}
                />
              </div>
            </div>
            <div className={classNames(ghost && styles.ghostHide)} style={{ position: 'relative' }}>
              <div
                onClick={(e) => onClickTreeNode(data, e)}
                onContextMenu={(e) => typeof onContextMenu === 'function' && onContextMenu(e, { ...data, childCount })}
              >
                <span className={styles.title}>{title}</span>
              </div>

              {!clone && onRemove && <Remove onClick={onRemove} />}
              {clone && childCount && childCount > 1 ? <span className={styles.Count}>{childCount}</span> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
