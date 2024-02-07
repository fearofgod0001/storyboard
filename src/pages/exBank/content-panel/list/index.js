import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { AutoComplete, Input, Table, Pagination } from "antd";
import { StyledExBankList } from "./styled";
import StyledAntdTable from "@/component/styledElement/styled-table";

// import { useQuery } from 'react-query';
// import { selectManualTitle } from '@/services/manual';

const AntTable = StyledAntdTable(Table);

const columns = [
  {
    title: `NO`,
    dataIndex: "RNUM",
    align: "center",
    width: "10px",
  },
  {
    title: `문제`,
    dataIndex: "EX_TITLE",
    align: "center",
    width: "700px",
    render: (title, record) => {
      return (
        <div>
          <div className="full-path">{record.FULL_PATH}</div>
          <div className="manual-title">{title}</div>
        </div>
      );
    },
  },
  {
    title: `형식`,
    dataIndex: "EX_TYPE",
    align: "center",
    width: "60px",
    render: (title) => {
      return <div>{title === "MCQ" ? "객관식" : "주관식"}</div>;
    },
  },
  {
    title: `등록자`,
    dataIndex: "REG_USER_NM",
    align: "center",
    width: "150px",
  },
  {
    title: `등록일`,
    dataIndex: "MLC_PUB_DTTM",
    align: "center",
    width: "150px",
    render: (text) => moment(text).format("YYYY-MM-DD"),
  },
];

const { Search } = Input;

const List = ({
  mlList,
  onShowEdit,
  cPage,
  pageSize,
  totCount,
  onChangePage,
}) => {
  const [_mlist, setMlist] = useState(mlList);
  const [keyword, setKeyword] = useState();
  const [options, setOption] = useState([]);

  const onRowClick = useCallback(
    (record, rowIndex) => {
      onShowEdit(record, rowIndex);
    },
    [onShowEdit]
  );

  useEffect(() => {
    if (mlList) {
      setMlist(mlList);
    }
  }, [mlList]);

  // useEffect(() => {
  //   if (checkedList) {
  //     const filerList = mlList.filter((f) => checkedList.includes(f.EX_TYPE));
  //     setMlist(filerList);
  //   }
  // }, [checkedList, mlList]);

  //   const { data: manualData, isSuccess } = useQuery(
  //     ['selectManualTitle', keyword],
  //     () => selectManualTitle({ mual_title: keyword }),
  //     { enabled: Boolean(keyword) }
  //   );

  const onSearch = (e) => {
    if (e.target.value) {
      setKeyword(e.target.value);
    } else {
      setKeyword([]);
    }
  };

  //   useEffect(() => {
  //     if (isSuccess && manualData) {
  //       const { result } = manualData;
  //       const op = result.map((m) => ({ label: m._source.MLC_TITLE, value: m._id }));
  //       setOption(op);
  //     }
  //   }, [isSuccess, manualData]);

  return (
    <StyledExBankList>
      <AntTable
        cursor={"pointer"}
        columns={columns}
        dataSource={_mlist}
        onRow={(record, rowIndex) => {
          return { onClick: () => onRowClick(record, rowIndex) };
        }}
        pagination={false}
      />
      <div className="page-panel" style={{ textAlign: "center" }}>
        <Pagination
          defaultCurrent={1}
          current={cPage}
          pageSize={pageSize}
          total={totCount}
          onChange={onChangePage}
        />
      </div>
    </StyledExBankList>
  );
};

export default List;
