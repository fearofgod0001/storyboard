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
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';

//datasource spec
// [{id: value},{id: value},{id: value}]
export const ColTable = ({ defaultColumns, dataSource, onChangeSizing, handleDragEnd }) => {
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
      setColumns(defaultColumns);
    }
  }, [defaultColumns]);

  const [columnResizeMode] = useState('onChange');
  const [columnResizeDirection] = useState('ltr');

  const table = useReactTable({
    data: _dataSource,
    columns,
    columnSizing,
    columnResizeMode,
    columnResizeDirection,
    state: {
      columns,
    },
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
    const column = defaultColumns?.find((f) => f.id === id);
    return column?.label;
  };

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

  const _handleDragEnd = (e) => {
    const { active, over } = e;
    if (active && over && active.id !== over.id) {
      const updatedData = [...columns];
      const oldIndex = updatedData.findIndex((f) => f.id === active.id);
      const newIndex = updatedData.findIndex((f) => f.id === over.id);
      const newData = arrayMove(updatedData, oldIndex, newIndex);
      setColumns(newData);
      handleDragEnd(newData);
    }
  };

  const DraggableTableHeader = ({ header }) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
      id: header.column.id,
    });

    const style = {
      opacity: isDragging ? 0.8 : 1,
      position: 'relative',
      transform: CSS.Translate.toString(transform),
      transition: 'width transform 0.2s ease-in-out',
      whiteSpace: 'nowrap',
      width: header.column.getSize(),
      zIndex: isDragging ? 1 : 0,
    };

    return (
      <div colSpan={header.colSpan} ref={setNodeRef} style={style}>
        <div
          {...{
            key: header.id,
            className: 'th',
            style: {
              width: header.getSize(),
              whiteSpace: 'normal',
            },
          }}
        >
          {header.isPlaceholder ? null : reName(header)}
          <div {...attributes} {...listeners} style={{ cursor: 'pointer' }}>
            🟰
          </div>
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
    );
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
            modifiers={[restrictToHorizontalAxis]}
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
                  <SortableContext items={columns.map((item) => item.id)} strategy={horizontalListSortingStrategy}>
                    {headerGroup.headers.map((header) => (
                      <div key={header.id}>
                        <DraggableTableHeader key={header.id} header={header} />
                      </div>
                    ))}
                  </SortableContext>
                </div>
              ))}
            </div>
            <div
              {...{
                className: 'tbody',
              }}
            >
              {/* {table.getRowModel().rows.map((row, rIdx) => {
                return (
                  <div
                    {...{
                      key: row.id,
                      className: 'tr',
                    }}
                  >{`test`}</div>
                );
              })} */}
            </div>
          </DndContext>
        </div>
      </div>
    </StyledDmTable>
  );
};
