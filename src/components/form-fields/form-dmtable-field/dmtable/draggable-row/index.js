import { DmCell } from '../dm-cell';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DragRow = ({ row, columns, dataSetIndex, onChangeCell, pageMode }) => {
  const { transform, transition, setNodeRef, isDragging, attributes, listeners } = useSortable({
    id: row.id,
    animateLayoutChanges: () => false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
    display: 'flex',
  };

  const handleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div ref={setNodeRef} style={style} key={row.id}>
      {row.getVisibleCells().map((cell) => {
        const head = columns?.find((f) => f.id === cell?.column?.id);

        const cellStyle = {
          ...(head?.component === 'Rowhandle' ? handleStyle : {}),
          width: cell.column.getSize(),
        };

        return (
          <div key={cell.id} className="td" style={cellStyle}>
            <DmCell
              rowData={cell}
              head={head}
              dataSetIndex={dataSetIndex}
              rowIndex={cell?.row?.index}
              cell_id={cell?.column?.id}
              defaultValue={cell?.renderValue()}
              onChangeCell={onChangeCell}
              pageMode={pageMode}
              attributes={attributes}
              listeners={listeners}
              rowId={row.id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DragRow;
