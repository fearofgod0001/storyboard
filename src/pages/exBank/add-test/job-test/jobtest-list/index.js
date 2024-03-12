import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { AutoComplete, Input, Table, Pagination, Switch } from 'antd';
import StyledAntdTable from '@/components/styledElement/styled-table';
import StyledEditETestList from './styled';
import { StyledButton } from '@/components/styledElement';
import DailyTest from './daily-test';

const AntTable = StyledAntdTable(Table);

const { Search } = Input;

const JobTestList = ({
  exList,
  onShowEdit,
  cPage,
  pageSize,
  totCount,
  onCreateTest,
  onChangePage,
  onHandleShowResult,
}) => {
  const [_exist, setExList] = useState();
  const [keyword, setKeyword] = useState();
  const [options, setOption] = useState([]);
  const [switchFormat, setSwtichFormat] = useState(false);

  const columns = [
    {
      title: `NO`,
      dataIndex: 'RNUM',
      align: 'center',
      width: '10px',
    },
    {
      title: `시험명`,
      dataIndex: 'EX_TEST_TITLE',
      align: 'center',
      width: '900px',
      render: (title, record, rowIndex) => {
        return (
          <div className="manual-title" onClick={() => onRowClick(record, rowIndex)}>
            {title}
          </div>
        );
      },
    },
    {
      title: `시작일`,
      dataIndex: 'EX_START_DATE',
      align: 'center',
      width: '170px',
      render: (text) => moment(text).format('YY-MM-DD HH:mm'),
    },
    {
      title: `소요시간(분)`,
      dataIndex: 'EX_TEST_RUNTIME',
      align: 'center',
      width: '130px',
    },
    {
      title: `상태`,
      dataIndex: 'EX_TEST_STATUS',
      align: 'center',
      width: '80px',
      render: (title, record) => {
        let _title = ''; // _title 초기화

        switch (title) {
          case 'H':
            _title = '대기';
            break;
          case 'P':
            _title = '진행';
            break;
          case 'S':
            _title = '보류';
            break;
          case 'E':
            _title = '종료';
            break;
          default:
            _title = ''; // 기본값, 필요에 따라 조정 가능
        }
        return <div>{_title}</div>;
      },
    },
    {
      title: '결과',
      align: 'center',
      width: '80px',
      render: (title, record) => {
        return (
          <StyledButton className="btn-primary btn-xs" onMouseDown={() => onHandleShowResult(true, record)}>
            보기
          </StyledButton>
        );
      },
    },
  ];

  useEffect(() => {
    setExList(exList);
  }, [exList]);

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

  const onChangeSwitch = (checked) => {
    setSwtichFormat(checked);
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
      <div className="switch-panel">
        <Switch value={switchFormat} checkedChildren="달력" unCheckedChildren="리스트" onChange={onChangeSwitch} />
      </div>
      {switchFormat && <DailyTest _exist={_exist} onCreateTest={onCreateTest} />}
      {switchFormat === false && (
        <>
          <AntTable cursor={'pointer'} columns={columns} dataSource={_exist} pagination={false} />
          <div className="page-panel" style={{ textAlign: 'center' }}>
            <Pagination
              defaultCurrent={1}
              current={cPage}
              pageSize={pageSize}
              total={totCount}
              onChange={onChangePage}
            />
          </div>
        </>
      )}
    </StyledEditETestList>
  );
};

export default JobTestList;
