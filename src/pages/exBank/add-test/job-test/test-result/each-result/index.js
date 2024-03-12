import StyledEachResult from './styled';
import StyledAntdTable from '@/components/styledElement/styled-table';
import { Table, Select } from 'antd';
import { useMutation } from 'react-query';
import { updateExQaGradeScore } from '@/services/manual';
import { useEffect, useState } from 'react';

const AntTable = StyledAntdTable(Table);

const EachResult = ({ echRst }) => {
  const [grade, setGrade] = useState();

  const { mutate: mutateUpdExQaScore, isSuccess: isSuccessUpdExQaScore } = useMutation(
    'updateExQaGradeScore',
    updateExQaGradeScore
  );
  useEffect(() => {
    if (isSuccessUpdExQaScore) {
    }
  }, [isSuccessUpdExQaScore]);

  const onChangeExGrade = (_grade, record) => {
    setGrade(_grade);
    mutateUpdExQaScore({ ...record, EX_GRADE: _grade });
    console.debug('onChangeExGrade e,', _grade);
    console.debug('onChangeExGrade record,', record);
  };

  const columns = [
    {
      title: `번호`,
      dataIndex: 'RNUM',
      align: 'center',
      width: '50px',
      render: (title, record) => {
        return <div className="manual-title">{title + 1}</div>;
      },
    },
    {
      title: `문제 내용`,
      dataIndex: 'EX_DATA',
      align: 'center',
      width: '300px',
      render: (title) => {
        return <div className="manual-title">{title.EX_DESCRIP}</div>;
      },
    },
    {
      title: `해설`,
      dataIndex: 'EX_DATA',
      width: '300px',
      render: (title) => {
        return <div className="manual-title">{title.EX_EXPLAIN}</div>;
      },
    },
    {
      title: `정답`,
      dataIndex: 'EX_DATA',
      align: 'center',
      width: '150px',
      render: (title) => {
        return <div className="manual-title">{title.EX_ANSWER}</div>;
      },
    },
    {
      title: `응시자 답`,
      dataIndex: 'USER_QA_ANSWER',
      align: 'center',
      width: '150px',
    },
    {
      title: `정답`,
      dataIndex: 'EX_GRADE',
      align: 'center',
      width: '50px',
      render: (title, record) => {
        return (
          <div className="manual-title">
            <Select
              onChange={(e) => onChangeExGrade(e, record)}
              value={grade ?? title}
              style={{
                width: 55,
              }}
              options={[
                {
                  value: '1',
                  label: 'O',
                },
                {
                  value: '0',
                  label: 'X',
                },
              ]}
              disabled={record.EX_TYPE === 'MCQ'}
            />
          </div>
        );
      },
    },
    {
      title: `점수`,
      dataIndex: 'EX_SCORE',
      align: 'center',
      width: '50px',
      render: (title, record) => {
        return (
          <div className="manual-title">
            {record.USER_SCORE} / {title}
          </div>
        );
      },
    },
  ];

  return (
    <StyledEachResult>
      <AntTable cursor={'pointer'} columns={columns} dataSource={echRst} pagination={false} />
    </StyledEachResult>
  );
};

export default EachResult;
