import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { CheckListField } from "@/components/form-fields";
import { AutoComplete, Input, Table, Pagination } from "antd";
import StyledAntdTable from "@/components/styledElement/styled-table";
import StyledETestList from "./styled";

const AntTable = StyledAntdTable(Table);

const columns = [
  {
    title: `NO`,
    dataIndex: "RNUM",
    align: "center",
    width: "10px",
  },
  {
    title: `경로`,
    dataIndex: "FULL_PATH",
    align: "center",
    width: "300px",
    render: (title, record) => {
      return <div className="full-path">{record.FULL_PATH}</div>;
    },
  },
  {
    title: `문제`,
    dataIndex: "EX_TITLE",
    align: "center",
    width: "700px",
    render: (title) => {
      return <div className="manual-title">{title}</div>;
    },
  },
  {
    title: `형식`,
    dataIndex: "EX_TYPE",
    align: "center",
    width: "100px",
    render: (title) => {
      return <div>{title === "MCQ" ? "객관식" : "주관식"}</div>;
    },
  },
  {
    title: `등록자`,
    dataIndex: "REG_USER_NM",
    align: "center",
    width: "180px",
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

const ETestList = ({
  eTestList,
  onShowEdit,
  cPage,
  pageSize,
  totCount,
  onChangePage,
}) => {
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

  const onChangeTestType = (list) => {
    if (list) {
      const nList = eTestList.filter((f) => list.includes(f.EX_TYPE));
      setETestList(nList);
    }
  };

  return (
    <StyledETestList>
      <div style={{ padding: "10px 0 0 14px" }}>
        <CheckListField onChangeTestType={onChangeTestType} />
      </div>

      <div className="sch-panel">
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          popupMatchSelectWidth={500}
          style={{ width: "100%" }}
          options={options}
          size="large"
        >
          <Search
            size="large"
            placeholder="검색어를 입력해주세요"
            prefix={"검색 :"}
            onChange={onSearch}
          />
        </AutoComplete>
      </div>

      <AntTable
        cursor={"pointer"}
        columns={columns}
        dataSource={_eTestList}
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
    </StyledETestList>
  );
};

export default ETestList;
