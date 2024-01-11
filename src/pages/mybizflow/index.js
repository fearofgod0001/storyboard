import { useState } from "react";
import BizFlowPanel from "./bz-panel";
import { Modal } from "antd";
import update from "immutability-helper";
import { PlusCircleOutlined } from "@ant-design/icons";
import { StyledButton, StyledModal } from "@/components";
import StyledMyBizFlow from "./styled";

const AntModal = StyledModal(Modal);

const component = {
  BZ_COMPONENT: [
    { tools: "component1" },
    { tools: "component2" },
    { tools: "Memo component" },
  ],
  BZ_SOURCE: {
    BZ_SUMMARY: {},
    BZ_FLOW_SOURCE: [],
    BZ_MEMO: [
      { i: "1", x: 0, y: 0, w: 5, h: 1, scrt: "메모1의 test메모" },
      { i: "2", x: 3, y: 1, w: 3, h: 2, scrt: "메모2의 test메모" },
    ],
  },
  BZ_TAB_INFO: [
    {
      TAB_KEY: "tab1",
      LABEL: "BZ_FLOW1",
      POS: 1,
    },
    {
      TAB_KEY: "tab2",
      LABEL: "BZ_FLOW2",
      POS: 2,
    },
    {
      TAB_KEY: "tab3",
      LABEL: "BZ_FLOW3",
      POS: 3,
    },
  ],
};

const MyBIzFlow = () => {
  const [bzComponent, setBzComponent] = useState(component);
  const [isBizFlowOpen, setIsBizFlowOpen] = useState();
  const [dragItem, setDragItem] = useState();

  const onHandleMyBizFlow = () => {
    setIsBizFlowOpen(true);
  };

  const onCancel = () => {
    setIsBizFlowOpen(false);
  };

  const onDragStart = (value, compType) => {
    setDragItem(value);
  };

  const onDropEnd = (value, _, e) => {
    console.debug("onDropEnd", value);
    setBzComponent((prev) =>
      update(prev, { BZ_SOURCE: { BZ_MEMO: { $set: value } } })
    );
  };

  return (
    <StyledMyBizFlow>
      <StyledButton className="btn-primary" onClick={onHandleMyBizFlow}>
        <PlusCircleOutlined />
      </StyledButton>
      <AntModal
        className="modal-notitle-full-screen"
        open={isBizFlowOpen}
        onCancel={onCancel}
        autoHeight
        footer={false}
        destroyOnClose
      >
        <BizFlowPanel
          bzData={bzComponent}
          onDragStart={onDragStart}
          onDropEnd={onDropEnd}
          dragItem={dragItem}
        />
      </AntModal>
    </StyledMyBizFlow>
  );
};

export default MyBIzFlow;
