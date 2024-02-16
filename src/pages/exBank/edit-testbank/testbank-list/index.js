import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { AutoComplete, Input, Table, Pagination } from 'antd';
import StyledAntdTable from '@/components/styledElement/styled-table';
import StyledEditETestList from './styled';

const AntTable = StyledAntdTable(Table);

const columns = [
  {
    title: `NO`,
    dataIndex: 'RNUM',
    align: 'center',
    width: '10px',
  },
  {
    title: `시험명`,
    dataIndex: 'T_TITLE',
    align: 'center',
    width: '1000px',
    render: (title, record) => {
      return <div className="manual-title">{record.T_TITLE}</div>;
    },
  },
  {
    title: `시작일`,
    dataIndex: 'T_START_DATE',
    align: 'center',
    width: '170px',
    render: (text) => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: `소요시간`,
    dataIndex: 'T_TIME',
    align: 'center',
    width: '130px',
  },
  {
    title: `상태`,
    dataIndex: 'T_STATUS',
    align: 'center',
    width: '80px',
  },
];

const { Search } = Input;

const TestBankList = ({ eTestList, onShowEdit, cPage, pageSize, totCount, onChangePage }) => {
  const [_eTestList, setETestList] = useState();
  const [keyword, setKeyword] = useState();
  const [options, setOption] = useState([]);

  useEffect(() => {
    setETestList(eTestList);
  }, [eTestList]);

  const onRowClick = useCallback(
    (record, rowIndex) => {
      onShowEdit(record, rowIndex);
    },
    [onShowEdit]
  );

  const onSearch = (e) => {
    if (e.target.value) {
      setKeyword(e.target.value);
    } else {
      setKeyword([]);
    }
  };

  return (
    <StyledEditETestList>
      <div className="sch-panel">
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          popupMatchSelectWidth={500}
          style={{ width: '100%' }}
          options={options}
          size="large"
        >
          <Search size="large" placeholder="검색어를 입력해주세요" prefix={'검색 :'} onChange={onSearch} />
        </AutoComplete>
      </div>

      <AntTable
        cursor={'pointer'}
        columns={columns}
        dataSource={_eTestList}
        onRow={(record, rowIndex) => {
          return { onClick: () => onRowClick(record, rowIndex) };
        }}
        pagination={false}
      />
      <div className="page-panel" style={{ textAlign: 'center' }}>
        <Pagination defaultCurrent={1} current={cPage} pageSize={pageSize} total={totCount} onChange={onChangePage} />
      </div>
    </StyledEditETestList>
  );
};

export default TestBankList;
