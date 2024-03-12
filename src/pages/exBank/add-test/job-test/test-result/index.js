import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Table, Pagination, Modal } from 'antd';
import { StyledModal } from '@/components/styledElement';
import { selectExResultByUserId } from '@/services/manual';

import moment from 'moment';
import StyledTestResult from './styled';
import StyledAntdTable from '@/components/styledElement/styled-table';
import EachResult from './each-result';

const AntTable = StyledAntdTable(Table);
const AntModal = StyledModal(Modal);

const columns = [
  {
    title: `이름`,
    dataIndex: 'USER_NM',
    align: 'center',
    width: '200px',
  },
  {
    title: `사번`,
    dataIndex: 'USER_ID',
    align: 'center',
    width: '200px',
  },
  {
    title: `점수`,
    dataIndex: 'TTL_SCORE',
    align: 'center',
    width: '200px',
  },
  {
    title: `시작시간`,
    dataIndex: 'FIRST_START_DATE',
    align: 'center',
    width: '200px',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:SS'),
  },
  {
    title: `종료시간`,
    dataIndex: 'LAST_END_DATE',
    align: 'center',
    width: '200px',
    render: (text) => moment(text).format('YYYY-MM-DD HH:mm:SS'),
  },
];

const TestResult = ({ selectEx, resultList }) => {
  const { EX_TEST_TITLE, EX_TEST_RUNTIME, EX_START_DATE, EX_TEST_IDX } = selectEx || {};

  const [_resultList, setResultList] = useState(resultList);
  const [echRst, setEchRst] = useState();
  const [isEchResOpen, isSetEchResOpen] = useState();

  const {
    mutate: mutateSelRstByUsrId,
    isSuccess: isSuccessSelRstByUsrId,
    data: selRstByUsrIdData,
  } = useMutation('selectExResultByUserId', selectExResultByUserId);

  useEffect(() => {
    if (selRstByUsrIdData && isSuccessSelRstByUsrId) {
      const { list } = selRstByUsrIdData || {};
      setEchRst(list);
    }
  }, [isSuccessSelRstByUsrId, selRstByUsrIdData]);

  const onRowClick = (record, rowIndex) => {
    isSetEchResOpen(true);
    mutateSelRstByUsrId({ ...record, EX_TEST_IDX: EX_TEST_IDX });
  };

  const onCancelEchRes = () => {
    isSetEchResOpen(false);
  };

  return (
    <StyledTestResult>
      <div className="result-title">시험 정보</div>
      <div className="test-info">
        <div className="test-seperate">
          <div className="test-title">
            <div className="head">제목</div>
            <div className="content">{EX_TEST_TITLE}</div>
          </div>
        </div>
        <div className="test-seperate">
          <div className="test-runtime">
            <div className="head">소요시간(분)</div>
            <div className="content">{EX_TEST_RUNTIME}</div>
          </div>

          <div className="test-start-date">
            <div className="head">시작시간</div>
            <div className="content">{moment(EX_START_DATE).format('YYYY-MM-DD HH:mm:SS')}</div>
          </div>
        </div>
      </div>

      <div className="result-title">응시대상 목록</div>
      <AntTable
        cursor={'pointer'}
        columns={columns}
        dataSource={resultList}
        onRow={(record, rowIndex) => {
          return { onClick: () => onRowClick(record, rowIndex) };
        }}
        pagination={false}
      />
      <div className="page-panel" style={{ textAlign: 'center' }}>
        <Pagination defaultCurrent={1} />
      </div>
      <AntModal
        // style={{ top: '20px' }}
        title="시험 결과 보기"
        open={isEchResOpen}
        width={1500}
        footer={false}
        onCancel={onCancelEchRes}
      >
        <EachResult echRst={echRst} />
      </AntModal>
    </StyledTestResult>
  );
};

export default TestResult;
