import React from 'react';
import { Select, TreeSelect } from 'antd';

export const FormSelectField = ({ value, onChange, pageMode, options = [], placeholder, init }) => {
  const option = options.find((f) => f.value === value);
  return pageMode === 'V' ? (
    <div style={{ paddingLeft: '10px', fontSize: '12px' }}>{option?.label}</div>
  ) : (
    <Select
      style={{ fontSize: '12px' }}
      defaultValue={init}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
    />
  );
};

export const FormTreeSelectField = ({
  value,
  onChange,
  pageMode,
  labelData = [],
  treeData = [],
  placeholder,
  init,
}) => {
  const option = labelData.find((f) => f.value === value);
  return pageMode === 'V' ? (
    <div style={{ paddingLeft: '10px', fontSize: '12px' }}>{option?.label}</div>
  ) : (
    <TreeSelect
      style={{ fontSize: '12px' }}
      defaultValue={init}
      value={value}
      onChange={onChange}
      treeData={treeData}
      placeholder={placeholder}
    />
  );
};

export const FormInitSelectField = ({ value, onChange, init, onHandleColumn }) => {
  const _onChange = (value) => {
    onChange(value);
    typeof onHandleColumn && onHandleColumn(value);
  };
  return (
    <Select
      defaultValue={1}
      style={{
        width: 180,
      }}
      value={value}
      onChange={_onChange}
      options={init}
    />
  );
};
