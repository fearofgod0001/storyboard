import { useEffect, useState, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import uuid from 'react-uuid';
import update from 'immutability-helper';
import { Input, Checkbox, Select } from 'antd';
import { List } from './list';
import { DmTable } from '../dmtable';
import { StyledConfig } from './styled';
import { StyledButton } from '@/components/styledElement';

const unit = {
  isTitle: true,
  title: undefined,
  columns: [],
};

const itemSpec = {
  id: undefined,
  label: undefined,
  accessorKey: undefined,
  component: undefined,
  config: undefined,
  size: 150,
};

const { Option } = Select;
const FormDmTableFieldConfig = ({ options, onChangeConfig }) => {
  const init = useRef({ ...unit });
  const [configSet, setConfig] = useState(unit);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (options) {
      setConfig(options);
    }
  }, [options]);

  const [item, setItem] = useState();

  const onChange = (key, value) => {
    setItem((init) => ({ ...init, [key]: value }));
  };

  const onAddItem = () => {
    const id = uuid();
    setConfig((init) => ({ ...init, columns: [...init.columns, { ...itemSpec, ...item, accessorKey: id, id }] }));
    setItem();
  };

  useEffect(() => {
    if (!isEqual(configSet, init.current)) {
      init.current = configSet;

      const result = configSet?.columns?.reduce((acc, item) => {
        acc[item.id] = undefined; // id를 키로 하고 label을 값으로 설정
        return acc;
      }, {});
      setDataSource([result]);
      onChangeConfig({ ...configSet });
    }
  }, [configSet]);

  const onRemove = (row) => {
    setConfig((init) => {
      const pos = init.columns.findIndex((f) => f.id === row.id);
      return update(init, { columns: { $splice: [[pos, 1]] } });
    });
  };

  const onChangeSizing = ({ id, size }) => {
    setConfig((init) => {
      const pos = init.columns.findIndex((f) => f.id === id);
      return update(init, { columns: { [pos]: { $set: { ...init.columns[pos], size } } } });
    });
  };

  return (
    <StyledConfig>
      <div className="item unline">
        <div className="label">
          <Checkbox checked={configSet.isTitle} onChange={(val) => onChange('isTitle', val)}>
            제목표시 :
          </Checkbox>
        </div>
        <div className="setting">
          <Input style={{ width: '400px' }} placeholder="제목을 입력해 주세요" />
        </div>
      </div>
      <div className="config-panel">
        <div className="config-item">
          <div className="config-label">항목명</div>
          <div>
            <Input onChange={(e) => onChange('label', e.target.value)} value={item?.label} />
          </div>
          <div className="config-label">입력유형</div>
          <div>
            <Select
              placeholder="입력유형을 선택해 주세요"
              style={{ width: '250px' }}
              onChange={(value) => onChange('component', value)}
              value={item?.component}
            >
              <Option value="INPUT">INPUT</Option>
              <Option value="TextArea">TEXT</Option>
              <Option value="Checkbox">CHECKBOX</Option>
              <Option value="WebEdit">EDIT</Option>
            </Select>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <StyledButton className="btn-primary btn-xs" onClick={onAddItem}>
              추가
            </StyledButton>
          </div>
        </div>
      </div>
      <div>
        <List list={configSet?.columns} onRemove={onRemove} />
      </div>
      <div className="size-title">사이즈 설정</div>
      <div className="size-wrap">
        <div className="size-panel">
          <div className="dm-panel">
            <DmTable dataSource={dataSource} defaultColumns={configSet?.columns} onChangeSizing={onChangeSizing} />
          </div>
        </div>
      </div>
    </StyledConfig>
  );
};

export default FormDmTableFieldConfig;
