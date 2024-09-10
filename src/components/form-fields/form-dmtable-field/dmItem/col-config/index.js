import { useEffect, useState, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import update from 'immutability-helper';
import { StyledConfig } from './styled';
import { ColTable } from './col-table';

const unit = {
  isTitle: true,
  title: undefined,
  columns: [],
};

//게시판 내에서 사용 할 컬럼 수정 창
const ColumnFieldConfig = ({ options, preColumns, onChangeColumn, handleColDragEnd }) => {
  const init = useRef({ ...unit });
  const [configSet, setConfig] = useState(unit);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (options) {
      setConfig(options);
    }
  }, [options]);

  useEffect(() => {
    if (!isEqual(configSet, init.current)) {
      init.current = configSet;

      const result = configSet?.columns?.reduce((acc, item) => {
        acc[item.id] = undefined; // id를 키로 하고 label을 값으로 설정
        return acc;
      }, {});
      setDataSource([result]);
      onChangeColumn({ ...configSet });
    }
  }, [configSet]);

  const onChangeSizing = ({ id, size }) => {
    setConfig((init) => {
      const pos = init.columns.findIndex((f) => f.id === id);
      return update(init, { columns: { [pos]: { $set: { ...init.columns[pos], size } } } });
    });
  };

  return (
    <StyledConfig>
      <div className="item unline">
        <div className="size-title">컬럼 변경</div>
        <div className="size-wrap">
          <div className="size-panel">
            <div className="dm-panel">
              <ColTable
                dataSource={dataSource}
                defaultColumns={preColumns}
                onChangeSizing={onChangeSizing}
                handleDragEnd={handleColDragEnd}
              />
            </div>
          </div>
        </div>
      </div>
    </StyledConfig>
  );
};

export default ColumnFieldConfig;
