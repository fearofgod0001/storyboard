import React, { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { BorderOutlined, PlusOutlined } from '@ant-design/icons';
import { DmItem } from './dmItem';

const initDmData = {
  title: undefined,
  dmTableData: [],
  columns: [],
};
export const FormDmTableField = ({ id, value, options, pageMode, isMock, onChangeAsync }) => {
  const [dmItemSet, setDmItemSet] = useState([{ ...initDmData }]);

  useEffect(() => {
    if (value) {
      console.debug('value ===>', value);
      setDmItemSet(value);
    }
  }, [value]);

  const onAddDmItem = () => {
    setDmItemSet((init) => update(init, { $push: [{ ...initDmData }] }));
  };

  const onChangeDmItem = (dataSetIndex, dataSource) => {
    setDmItemSet((init) => update(init, { [dataSetIndex]: { $set: { ...dataSource } } }));
  };

  useEffect(() => {
    if (dmItemSet) {
      typeof onChangeAsync === 'function' && onChangeAsync(id, dmItemSet);
    }
  }, [dmItemSet]);

  console.debug('dmItemSet ===>', dmItemSet);

  return (
    <div>
      {Array.isArray(dmItemSet) &&
        dmItemSet?.map((dmData, dataSetIndex) => (
          <DmItem
            key={`table-${dataSetIndex}`}
            dataSetIndex={dataSetIndex}
            defaultDmData={dmData}
            pageMode={pageMode}
            options={options}
            onAddDmItem={onAddDmItem}
            onChangeDmItem={onChangeDmItem}
          />
        ))}
    </div>
  );
};
