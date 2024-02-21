import { useState, useEffect } from 'react';
import { Input } from 'antd';
import { CheckListField, SortTreeSelectField } from '@/components/form-fields';
import { useQuery } from 'react-query';
import { selectExInfoList } from '@/services/manual';
import SrchTestList from './search-test-list';

const { Search } = Input;

const SearchField = ({ exTreeData, onAddTestItem }) => {
  const [selectNodeId, setSelectNodeId] = useState();
  const [eTestList, setETestList] = useState();
  const [constTestList, setConTestList] = useState();

  const [pageSize, setPageSize] = useState(10);
  const [cPage, setPage] = useState(1);

  const onChangeTestType = (list) => {
    if (list) {
      const nList = constTestList.filter((f) => list.includes(f.EX_TYPE));
      setETestList(nList);
    }
  };

  const onSearch = (value, _e, info) => {
    console.debug('onSearch', value);
  };

  const onSelectTreeNode = (codeIds) => {
    setSelectNodeId(codeIds);
  };

  const {
    data: exDataListList,
    isSuccess: isSuccessExInfo,
    refetch: onRefetchExData,
  } = useQuery(['selectExInfoList', cPage, pageSize, selectNodeId], () =>
    selectExInfoList({ CPAGE: cPage, PAGE_SIZE: pageSize, EX_CODE_ID: selectNodeId })
  );

  useEffect(() => {
    if (exDataListList && isSuccessExInfo) {
      const { list } = exDataListList;
      setETestList(list);
      setConTestList(list);
    }
  }, [isSuccessExInfo, exDataListList]);

  return (
    <>
      <div className="lpanel-chklist">
        <CheckListField onChangeTestType={onChangeTestType} />
      </div>
      <div className="tree-search">
        <Search placeholder="검색" onSearch={onSearch} enterButton />
      </div>
      <div className="tree-select">
        <SortTreeSelectField treeData={exTreeData} onSelectTreeNode={onSelectTreeNode} />
      </div>
      <div className="ex-list">
        <SrchTestList eTestList={eTestList} onAddTestItem={onAddTestItem} />
      </div>
    </>
  );
};

export default SearchField;
