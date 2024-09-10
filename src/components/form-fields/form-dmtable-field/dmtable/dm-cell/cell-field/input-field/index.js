import { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
export const InputField = ({ dataSetIndex, rowIndex, cell_id, defaultValue, onChangeCell, pageMode }) => {
  const [value, setValue] = useState();
  const init = useRef();

  const delayTimeout = useRef(null);

  useEffect(() => {
    if (defaultValue !== init.current) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value) {
      if (delayTimeout.current) {
        clearTimeout(delayTimeout.current);
      }

      delayTimeout.current = setTimeout(() => {
        typeof onChangeCell === 'function' && onChangeCell(dataSetIndex, rowIndex, cell_id, value);
      }, 200);
    }
  }, [value]);

  const onChange = (e) => {
    init.current = e.target.value;
    setValue(e.target.value);
  };

  return <Input onChange={onChange} value={value} disabled={pageMode === 'V'} />;
};
