import React from 'react';
import { FolderTwoTone, FolderOpenTwoTone, FileTwoTone } from '@ant-design/icons';

export function Handle(props) {
  const { collapsed, childCount, onRenderIcon, data, numberingListItem } = props;
  const { Numbering } = numberingListItem ?? {};

  return (
    <div cursor="grabbing" data-cypress="draggable-handle" {...props}>
      {typeof onRenderIcon === 'function' ? (
        onRenderIcon(data, collapsed, childCount)
      ) : childCount > 0 ? (
        collapsed ? (
          // <FolderTwoTone />
          <>{Numbering}</>
        ) : (
          // <FolderOpenTwoTone />
          <>{Numbering}</>
        )
      ) : (
        //<FileTwoTone/>
        <>{Numbering}</>
      )}
    </div>
  );
}
