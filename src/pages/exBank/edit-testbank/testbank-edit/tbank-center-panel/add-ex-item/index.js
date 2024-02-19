import { useEffect, useState, useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { selectExInfoList, selectManualCategoryInfo, selectExData } from '@/services/manual';
import { StyledButton, StyledModal } from '@/components';
import { Modal } from 'antd';
import StyledAddExItem from './styled';
import ETestTree from '@/pages/e-test/etest-tree';
import ETestList from '@/pages/e-test/etest-list';
import AddSelectItem from './add-select-item';

const AntModal = StyledModal(Modal);

const AddExItem = ({ onAddTestItem, isOpenSelectItem, onHandleSelectItem }) => {
  const [exTreeData, setExTreeData] = useState();
  const [selectNodeId, setSelectNodeId] = useState();
  const [_eTestList, setETestList] = useState();

  const [pageSize, setPageSize] = useState(10);
  const [totCount, setTotCount] = useState();
  const [cPage, setPage] = useState(1);
  const [selectedEx, setSelectedEx] = useState();

  //분류체계를 불러올 useQuery
  const { data: treeData, isSuccess: isSuccessTreeData } = useQuery(
    'selectManualCategoryInfo',
    selectManualCategoryInfo
  );

  useEffect(() => {
    if (isSuccessTreeData && treeData) {
      const { list } = treeData;
      setExTreeData(list);
    }
  }, [isSuccessTreeData, treeData]);

  //문제 리스트를 불러오는 useQuery
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
    }
  }, [isSuccessExInfo, exDataListList]);

  //문제 정보를 가져올 쿼리문
  const {
    mutate: mutateSelectExData,
    isSuccess: isSuccessSelectExData,
    data: selectExDataInfo,
  } = useMutation('selectExData', selectExData);

  useEffect(() => {
    if (selectExDataInfo && isSuccessSelectExData) {
      const { EX_QA } = selectExDataInfo || {};
      setSelectedEx(EX_QA);
      // setOpenSelectItem(true);
      onHandleSelectItem(true);
    }
  }, [isSuccessSelectExData, selectExDataInfo]);

  //트리데이터 선택시 실행하는 함수
  const onSelectTreeNode = (codeIds, e) => {
    const exCodeId = codeIds[0];
    setSelectNodeId(exCodeId);
  };

  //문제 제목 클릭시 record를 전달받아 form-Field를 채울 함수
  const onShowEdit = useCallback((record) => {
    if (record) {
      mutateSelectExData(record);
    }
  }, []);

  return (
    <StyledAddExItem>
      <div className="ex-category">
        <ETestTree exTreeData={exTreeData} onSelectTreeNode={onSelectTreeNode} height="calc(100vh - 286px)" />
      </div>
      <div className="category-info">
        <div className="ex-list">
          <ETestList
            cPage={cPage}
            pageSize={pageSize}
            totCount={totCount}
            eTestList={_eTestList}
            onShowEdit={onShowEdit}
          />
        </div>
        <AntModal
          style={{ top: '100px' }}
          title={`${selectedEx?.EX_TITLE}`}
          onCancel={() => onHandleSelectItem(false)}
          width={500}
          open={isOpenSelectItem}
          footer={false}
          destroyOnClose
        >
          <AddSelectItem selectedEx={selectedEx} onAddTestItem={onAddTestItem} />
        </AntModal>
      </div>
    </StyledAddExItem>
  );
};

export default AddExItem;
