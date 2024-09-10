import { useEffect, useRef, useState } from 'react';
import FroalaEditor from '@/components/editor/FroalaEditor';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import StyledEditorField from './styled';
export const EditorField = ({ dataSetIndex, rowIndex, cell_id, defaultValue, onChangeCell, pageMode }) => {
  const [model, setModel] = useState();
  const init = useRef();

  useEffect(() => {
    // if (defaultValue !== init.current) {
    //   setModel(defaultValue);
    // }

    if (defaultValue === null) {
      setModel('');
    } else {
      setModel(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (model) {
      typeof onChangeCell === 'function' && onChangeCell(dataSetIndex, rowIndex, cell_id, model);
    }
  }, [model]);

  const onModelChange = (val) => {
    init.current = val;
    setModel(val);
  };

  return pageMode === 'V' ? (
    <StyledEditorField>
      <FroalaEditorView model={model} />
    </StyledEditorField>
  ) : (
    <FroalaEditor toolbarInline model={model} onModelChange={(val) => onModelChange(val)} />
  );
};
