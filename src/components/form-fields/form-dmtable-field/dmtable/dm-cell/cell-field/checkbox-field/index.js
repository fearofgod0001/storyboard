import { useEffect, useRef, useState } from 'react';
import { Checkbox } from 'antd';
import { StyledCheckbox } from './styled';

export const CheckboxField = ({ dataSetIndex, rowIndex, cell_id, defaultValue, onChangeCell, pageMode }) => {
  const [value, setValue] = useState();
  const init = useRef();

  useEffect(() => {
    // if (defaultValue !== init.current) {
    //   setValue(defaultValue);
    // }

    if (defaultValue === null || !defaultValue) {
      setValue(false);
    } else if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value !== undefined) {
      typeof onChangeCell === 'function' && onChangeCell(dataSetIndex, rowIndex, cell_id, value);
    }
  }, [value]);

  const onChange = (e) => {
    init.current = e.target.checked;
    setValue(e.target.checked);
  };

  return (
    <StyledCheckbox>
      <Checkbox onChange={onChange} checked={value} disabled={pageMode === 'V'} />
    </StyledCheckbox>
  );
};
