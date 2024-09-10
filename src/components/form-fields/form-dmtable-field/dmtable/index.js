import { useEffect, useState, useRef } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { StyledDmTable } from './styled';

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DragRow from './draggable-row';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

//datasource spec
// [{id: value},{id: value},{id: value}]
export const DmTable = ({
  defaultColumns,
  dataSource,
  onChangeSizing,
  dataSetIndex,
  onChangeCell,
  pageMode,
  handleDragEnd,
  displayMenu,
}) => {
  const [_dataSource, setDataSource] = useState(() => []);
  const [columns, setColumns] = useState([]);
  const [columnSizing, setColumnSizing] = useState();
  const changeSize = useRef();

  useEffect(() => {
    if (dataSource) {
      setDataSource(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    if (defaultColumns) {
      if (pageMode !== 'V') {
        const rowHandler = {
          id: 'row_handle',
          label: 'Move',

          component: 'Rowhandle',
          size: 45,
        };
        setColumns([rowHandler, ...defaultColumns]);
      } else {
        setColumns(defaultColumns);
      }
    }
  }, [defaultColumns, pageMode]);

  const [columnResizeMode] = useState('onChange');
  const [columnResizeDirection] = useState('ltr');

  const table = useReactTable({
    data: _dataSource,
    columns,
    columnSizing,
    columnResizeMode,
    columnResizeDirection,
    getRowId: (row) => row.userId,
    onColumnSizingInfoChange: (nSize) => {
      setColumnSizing(nSize);
    },
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (columnSizing) {
      if (columnSizing.isResizingColumn) {
        changeSize.current = columnSizing;
      } else {
        const size = changeSize.current.startSize + changeSize.current.deltaOffset;
        const id = changeSize.current.isResizingColumn;
        typeof onChangeSizing === 'function' && id !== 'row_handle' && onChangeSizing({ id, size });
      }
    }
  }, [columnSizing]);

  const reName = (header) => {
    const id = header.id;
    const column = columns?.find((f) => f.id === id);
    return column?.label;
  };

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

  //row를 움직일 기준이 되는 id들의 값
  const dataIds = table.getRowModel().rows.map((row) => row.id);

  const _handleDragEnd = (e) => {
    const { active, over } = e;
    if (active && over && active.id !== over.id) {
      const updatedData = [...dataSource];
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);

      const newData = arrayMove(updatedData, oldIndex, newIndex);
      //상위 handleDragEnd 로 변경된 값을 올려준다.
      handleDragEnd(newData);
    }
  };

  return (
    <StyledDmTable style={{ direction: table.options.columnResizeDirection }}>
      <div className="overflow-x-auto">
        <div
          {...{
            className: 'divTable',
            style: {
              width: table.getTotalSize(),
            },
          }}
        >
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={_handleDragEnd}
            sensors={sensors}
          >
            <div className="thead">
              {table.getHeaderGroups().map((headerGroup) => (
                <div
                  {...{
                    key: headerGroup.id,
                    className: 'tr',
                  }}
                >
                  {headerGroup.headers.map((header) => (
                    <div key={header.id}>
                      <div
                        {...{
                          key: header.id,
                          className: 'th',
                          style: {
                            width: header.getSize(),
                          },
                        }}
                        onContextMenu={(e) => displayMenu(e, 'col', header)}
                      >
                        {header.isPlaceholder ? null : reName(header)}
                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${table.options.columnResizeDirection} ${
                              header.column.getIsResizing() ? 'isResizing' : ''
                            }`,
                            style: {
                              transform:
                                columnResizeMode === 'onEnd' && header.column.getIsResizing()
                                  ? `translateX(${
                                      (table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                                      (table.getState().columnSizingInfo.deltaOffset ?? 0)
                                    }px)`
                                  : '',
                            },
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              {...{
                className: 'tbody',
              }}
            >
              <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <div
                      {...{
                        key: row.id,
                        className: 'tr',
                      }}
                      onContextMenu={(e) => displayMenu(e, 'row', row)}
                    >
                      <DragRow
                        row={row}
                        columns={columns}
                        dataSetIndex={dataSetIndex}
                        onChangeCell={onChangeCell}
                        pageMode={pageMode}
                      />
                    </div>
                  );
                })}
              </SortableContext>
            </div>
          </DndContext>
        </div>
      </div>
    </StyledDmTable>

    // <pre>
    //   {JSON.stringify(
    //     {
    //       tableState: table.getState(),
    //       columnSizing: table.getState().columnSizing,
    //       columnSizingInfo: table.getState().columnSizingInfo,
    //     },
    //     null,
    //     2
    //   )}
    // </pre>
  );
};
