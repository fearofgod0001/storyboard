import { useState, useRef } from 'react';
import { Menu, Item, Submenu, Separator, useContextMenu } from 'react-contexify';
import { BorderOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { StyledButton } from '@/components/styledElement';
import { StyledDmTableField } from './styled';
import { Input, Modal, message } from 'antd';
import { DmTable } from '../dmtable';
import { useEffect } from 'react';

import StyledModal from '@/components/modal/styled-modal';
import isEqual from 'lodash/isEqual';
import update from 'immutability-helper';
import ColumnFieldConfig from './col-config';
import uuid from 'react-uuid';
// const initDmData = {
//   title: undefined,
//   dmTableData: [],
//   colums: [],
// };

const AntModal = StyledModal(Modal);

export const DmItem = ({ dataSetIndex, defaultDmData, options, pageMode, onAddDmItem, onChangeDmItem }) => {
  const [dmItemData, setItemDmData] = useState();
  const initDmItemData = useRef();
  const [title, setTitle] = useState();
  const [dmTableData, setDmTableData] = useState();
  const [columns, setColumns] = useState();
  const [initRowData, setRowData] = useState();

  //우클릭을 누른 위치 설정
  const [openColOpt, setOpenColOpt] = useState();
  const [selectedCell, setSelectedCell] = useState(null);

  // 컬럼수정시 저장할 임시 컬럼, 적용을 누르면 해당 컬럼을 적용한다
  const [tempCols, setTempCols] = useState();
  // 복사한 cell 을 저장할 states
  const [copyCell, setCopyCell] = useState();

  const itemId = uuid();

  useEffect(() => {
    if (!isEqual(defaultDmData, initDmItemData.current)) {
      console.debug('DmItem didmount');
      const { title, dmTableData, columns } = defaultDmData;
      setTitle(title);
      setColumns(columns);
      setDmTableData(dmTableData);
      setItemDmData(defaultDmData);
    }
  }, [defaultDmData]);

  useEffect(() => {
    if (columns && options) {
      if (columns.length === 0) {
        setColumns(options.columns);
      } else {
        const rowData = columns?.reduce((acc, item) => {
          acc[item.id] = undefined; // id를 키로 하고 label을 값으로 설정
          return acc;
        }, {});
        setRowData(() => rowData);
      }
    }
  }, [columns, options]);

  useEffect(() => {
    if (dmTableData && initRowData) {
      if (dmTableData.length === 0) {
        setDmTableData((init) => update(init, { $push: [{ ...initRowData }] }));
      }
    }
  }, [dmTableData, initRowData]);

  useEffect(() => {
    if (title) {
      setItemDmData((init) => update(init, { title: { $set: title } }));
    }
    if (dmTableData) {
      setItemDmData((init) => update(init, { dmTableData: { $set: dmTableData } }));
    }

    if (columns) {
      setItemDmData((init) => update(init, { columns: { $set: columns } }));
    }
  }, [title, dmTableData, columns]);

  useEffect(() => {
    if (dmItemData) {
      initDmItemData.current = { ...dmItemData };
      typeof onChangeDmItem === 'function' && onChangeDmItem(dataSetIndex, dmItemData);
    }
  }, [dmItemData]);

  const onChangeTitle = (e) => {
    setTitle(() => e.target.value);
  };

  const onChangeCell = (_, rowIndex, cell_id, val) => {
    setDmTableData((init) => update(init, { [rowIndex]: { [cell_id]: { $set: val } } }));
  };

  const onAddRowItem = () => {
    setDmTableData((init) => update(init, { $push: [{ ...initRowData }] }));
  };

  const onChangeSizing = ({ id, size }) => {
    setColumns((init) => {
      const pos = init.findIndex((f) => f.id === id);
      return update(init, { [pos]: { size: { $set: size } } });
    });
  };

  const handleDragEnd = (_data) => {
    setDmTableData(_data);
  };

  const { show } = useContextMenu({ id: `row-${itemId}` });

  const displayMenu = (e, loc, cell) => {
    if (pageMode !== 'V') {
      show({ event: e });
      if (loc === 'row') {
        setSelectedCell(cell);
      }
    }
  };

  const onChangeDmTable = () => {
    setOpenColOpt(true);
  };

  const onCloseColOpt = () => {
    setOpenColOpt(false);
    setTempCols();
  };

  const onAddRow = (loc, _row, _cCell) => {
    //복사는 복사한 _cCell값을 그대로 삽입
    if (loc === 'copy') {
      if (_cCell) {
        setDmTableData((prevData) =>
          update(prevData, {
            $splice: [[_row.id, 0, { ..._cCell }]],
          })
        );
      } else {
        message.info('복사한 셀이 없습니다.');
      }
    } else {
      //_row.id 는 index값과 일치
      const idx = _row?.id != null ? (loc === 'up' ? Number(_row.id) : Number(_row.id) + 1) : 0;
      setDmTableData((prevData) =>
        update(prevData, {
          $splice: [[idx, 0, { ...initRowData }]],
        })
      );
    }
  };

  const onDelRow = (_row) => {
    const idx = Number(_row.id);
    setDmTableData((prevData) =>
      update(prevData, {
        $splice: [[idx, 1]],
      })
    );
  };

  const onChangeColumn = (_colConfig) => {
    if (_colConfig) {
      const { columns } = _colConfig || {};
      setTempCols(columns);
    }
  };

  const onChangeCols = () => {
    if (tempCols) {
      setColumns(tempCols);
      setOpenColOpt(false);
    } else {
      message.info('변경 사항이 없습니다.');
    }
  };

  const handleColDragEnd = (_col) => {
    setTempCols(_col);
  };

  const onCopyCell = (_col, _tableData) => {
    //현재 dmTableData 값의 index값을 추출하여 해당 위치의 data를 복사한다
    setCopyCell(_tableData[Number(_col.index)]);
  };

  return (
    <StyledDmTableField>
      {options?.isTitle && (
        <div className="title-panel">
          <Input
            addonBefore={<BorderOutlined />}
            addonAfter={pageMode !== 'V' && <PlusOutlined onClick={onAddDmItem} />}
            onChange={onChangeTitle}
            value={title}
          />
        </div>
      )}
      {pageMode !== 'V' && (
        <div className="btn-panel">
          <StyledButton className="btn-primary btn-xs" onClick={onAddRowItem}>
            <PlusOutlined />
            항목추가
          </StyledButton>
        </div>
      )}
      <div className="dm-panel">
        <DmTable
          defaultColumns={columns}
          dataSource={dmTableData}
          dataSetIndex={dataSetIndex}
          onChangeCell={onChangeCell}
          onChangeSizing={onChangeSizing}
          pageMode={pageMode}
          handleDragEnd={handleDragEnd}
          displayMenu={displayMenu}
        />
      </div>

      <Menu
        id={`row-${itemId}`}
        animation={{ enter: 'scale', exit: 'fade' }}
        style={{ minWidth: '100px', fontSize: '13px' }}
        theme="light"
      >
        <Item onClick={() => onChangeDmTable()}>열 수정</Item>
        <Submenu label={'셀 관리'} style={{ minWidth: '100px', fontSize: '13px' }}>
          <Item onClick={() => onAddRow('up', selectedCell)}>위 셀 삽입</Item>
          <Item onClick={() => onAddRow('down', selectedCell)}>아래 셀 삽입</Item>
          <Separator />
          <Item onClick={() => onCopyCell(selectedCell, dmTableData)}>셀 복사</Item>
          <Item onClick={() => onAddRow('copy', selectedCell, copyCell)}>복사한 셀 삽입</Item>
          <Separator />
          <Item onClick={() => onDelRow(selectedCell)}>셀 삭제</Item>
        </Submenu>
      </Menu>

      <AntModal
        open={openColOpt}
        width={850}
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            열 수정
            <StyledButton className="btn-white btn-xs" style={{ marginRight: '21px' }} onClick={onChangeCols}>
              <SaveOutlined />
              적용
            </StyledButton>
          </div>
        }
        autoHeight={false}
        onCancel={onCloseColOpt}
        footer={false}
      >
        <ColumnFieldConfig
          options={options}
          preColumns={columns}
          onChangeColumn={onChangeColumn}
          handleColDragEnd={handleColDragEnd}
        />
      </AntModal>
    </StyledDmTableField>
  );
};
