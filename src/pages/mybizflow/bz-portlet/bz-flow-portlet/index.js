import { useEffect, useState } from "react";
import { InputNumber, Modal } from "antd";
import StyledBzFlowPortlet from "./styled";
import { MoreOutlined, RightOutlined } from "@ant-design/icons";

const BzMemoPortlet = ({}) => {
  const [isFLowMoalOpen, setIsFlowModalOpen] = useState(true);
  const [flowChart, setFlowChart] = useState([]);
  const [flowNum, setFlowNum] = useState(true);

  const handleCancel = () => {
    setIsFlowModalOpen(false);
  };

  const onhandleFlowArr = () => {
    if (flowNum > flowChart.length) {
      setFlowChart((prev) => [
        ...prev,
        ...Array.from({ length: flowNum - prev.length }, (_, index) => ({
          id: prev.length + index + 1,
          value: `Item ${prev.length + index + 1}`,
        })),
      ]);
    } else if (flowNum < flowChart.length) {
      setFlowChart((prevFlowChart) => prevFlowChart.slice(0, flowNum));
    }
    setIsFlowModalOpen(false);
  };

  const onhandleModal = () => {
    setIsFlowModalOpen(true);
  };

  const onChangeFlowNum = (num) => {
    setFlowNum(num);
  };

  console.debug("flowChart", flowChart);

  return (
    <StyledBzFlowPortlet>
      {isFLowMoalOpen && (
        <Modal
          title="Basic Modal"
          open={isFLowMoalOpen}
          onOk={onhandleFlowArr}
          onCancel={handleCancel}
          width={180}
        >
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={onChangeFlowNum}
            style={{ width: "70px" }}
          />
        </Modal>
      )}
      <div className="flow-header">
        <MoreOutlined
          style={{ marginRight: "7px", cursor: "pointer" }}
          onClick={onhandleModal}
        />
      </div>

      <div className="flow-content">
        {flowChart.map((item, i) => {
          return (
            <div className="flow-item-container">
              <div className="flow-item"> </div>
              {item.id !== flowChart.length && (
                <div className="flow-arrow">
                  <RightOutlined />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </StyledBzFlowPortlet>
  );
};

export default BzMemoPortlet;
