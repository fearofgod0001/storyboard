import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { selectExData } from '@/services/manual';

const SrchListItem = ({ item }) => {
  const { EX_TITLE } = item || {};

  const [isOpenData, setIsOpenData] = useState();
  const [itemData, setItemData] = useState();

  //문제 정보를 가져올 쿼리문
  const {
    mutate: mutateSelectExData,
    isSuccess: isSuccessSelectExData,
    data: selectExDataInfo,
  } = useMutation('selectExData', selectExData);

  useEffect(() => {
    if (selectExDataInfo && isSuccessSelectExData) {
      const { EX_QA } = selectExDataInfo || {};
      setItemData(EX_QA);
      setIsOpenData(!isOpenData);
    }
  }, [isSuccessSelectExData, selectExDataInfo]);

  const onHandleExData = () => {
    mutateSelectExData(item);
  };

  return (
    <div className="list-item">
      <div className="item-title" onClick={onHandleExData}>
        <div className="item-icon">Q.</div>
        <div className="item-content"> {EX_TITLE} </div>
      </div>
      {isOpenData && <div className="item-descrip">{itemData?.EX_DATA.EX_DESCRIP}</div>}
    </div>
  );
};

export default SrchListItem;
