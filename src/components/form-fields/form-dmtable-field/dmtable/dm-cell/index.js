import { Editor, Input, Checkbox } from './cell-field';
import { HandleField } from './cell-field/handle-field';
import StyledDmCell from './styled';

export const DmCell = ({
  head,
  dataSetIndex,
  rowIndex,
  cell_id,
  defaultValue,
  onChangeCell,
  attributes,
  listeners,
  rowId,
  pageMode,
}) => {
  const onRender = (head) => {
    switch (head?.component) {
      case 'INPUT':
        return (
          <Input
            dataSetIndex={`${rowIndex}_${dataSetIndex}`}
            rowIndex={rowIndex}
            cell_id={cell_id}
            defaultValue={defaultValue}
            onChangeCell={onChangeCell}
            pageMode={pageMode}
          />
        );
      case 'WebEdit':
        return (
          <Editor
            key={cell_id}
            dataSetIndex={`${rowIndex}_${dataSetIndex}`}
            rowIndex={rowIndex}
            cell_id={cell_id}
            defaultValue={defaultValue}
            onChangeCell={onChangeCell}
            pageMode={pageMode}
          />
        );
      case 'Checkbox':
        return (
          <Checkbox
            dataSetIndex={`${rowIndex}_${dataSetIndex}`}
            rowIndex={rowIndex}
            cell_id={cell_id}
            defaultValue={defaultValue}
            onChangeCell={onChangeCell}
            pageMode={pageMode}
          />
        );
      case 'Rowhandle':
        return <HandleField rowId={rowId} attributes={attributes} listeners={listeners} />;
      default:
        return defaultValue;
    }
  };

  return <StyledDmCell>{onRender(head)}</StyledDmCell>;
};
