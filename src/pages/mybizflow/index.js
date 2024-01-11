import { useState } from "react";
import BizFlowPanel from "./bz-panel";
import { Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { StyledButton, StyledModal } from "@/components";
import StyledMyBizFlow from "./styled";

const AntModal = StyledModal(Modal);

const component = {
  BZ_COMPONENT: [
    { tools: "component1" },
    { tools: "component2" },
    { tools: "component3" },
  ],
  BZ_SOURCE: {
    BZ_SUMMARY: {},
    BZ_FLOW_SOURCE: [],
    BZ_MEMO: [
      { title: "메모1", describtion: "메모1의 test메모" },
      { title: "메모2", describtion: "메모2의 test메모" },
      { title: "메모3", describtion: "메모3의 test메모" },
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
  const [isBizFlowOpen, setIsBizFlowOpen] = useState();

  const onHandleMyBizFlow = () => {
    setIsBizFlowOpen(true);
  };

  const onCancel = () => {
    setIsBizFlowOpen(false);
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
        <BizFlowPanel bzData={component} />
      </AntModal>
    </StyledMyBizFlow>
  );
};

export default MyBIzFlow;
