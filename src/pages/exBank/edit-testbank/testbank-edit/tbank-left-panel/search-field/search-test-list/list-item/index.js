import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { selectExData } from "@/services/manual";
import { useDrag } from "react-dnd";
import { RightOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";

const SrchListItem = ({ item, onAddTestItem }) => {
  const { EX_TITLE } = item || {};

  const [isOpenData, setIsOpenData] = useState();
  const [itemData, setItemData] = useState();

  //문제 정보를 가져올 쿼리문
  const {
    mutate: mutateSelectExData,
    isSuccess: isSuccessSelectExData,
    data: selectExDataInfo,
  } = useMutation("selectExData", selectExData);

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

  const _onAddTestItem = () => {
    onAddTestItem({
      EX_IDX: item.EX_IDX,
      EX_DATA: itemData.EX_DATA,
      EX_TITLE: item.EX_TITLE,
      EX_TYPE: item.EX_TYPE,
    });
  };

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: "field",
      item: () => {
        if (itemData) {
          return {
            EX_IDX: item.EX_IDX,
            EX_DATA: itemData.EX_DATA,
            EX_TITLE: item.EX_TITLE,
            EX_TYPE: item.EX_TYPE,
          };
        }
      },
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          onAddTestItem(item);
        }
      },
      collect: (monitor) => {
        return { isDragging: monitor.isDragging() };
      },
    };
  }, [item, itemData]);

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div className="list-item" ref={drag} style={{ opacity }}>
      <div className="item-title" onMouseDown={onHandleExData}>
        <div className="item-icon">Q.</div>
        <div className="item-content"> {EX_TITLE} </div>
        <div className="item-show">
          {isOpenData ? <UpOutlined /> : <DownOutlined />}
        </div>
      </div>

      {isOpenData && (
        <div className="item-descrip">
          <div style={{ width: "100%" }}>{itemData?.EX_DATA.EX_DESCRIP}</div>
          <div className="item-arrow" onClick={_onAddTestItem}>
            <RightOutlined />
          </div>
        </div>
      )}
    </div>
  );
};

export default SrchListItem;
