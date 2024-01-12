import { useState } from 'react';
import BizFlowPanel from './bz-panel';
import { Modal } from 'antd';
import update from 'immutability-helper';
import { PlusCircleOutlined } from '@ant-design/icons';
import { StyledButton, StyledModal } from '@/components';
import StyledMyBizFlow from './styled';

const AntModal = StyledModal(Modal);

const component = {
  BZ_COMPONENT: [
    { tools: 'summary', portLet_W: 13, portLet_H: 1 },
    { tools: 'flow', portLet_W: 10, portLet_H: 3 },
    { tools: 'memo', portLet_W: 3, portLet_H: 2 },
  ],
  BZ_SOURCE: [],
  BZ_TAB_INFO: [
    {
      TAB_KEY: 'tab1',
      LABEL: 'BZ_FLOW1',
      POS: 1,
    },
    {
      TAB_KEY: 'tab2',
      LABEL: 'BZ_FLOW2',
      POS: 2,
    },
    {
      TAB_KEY: 'tab3',
      LABEL: 'BZ_FLOW3',
      POS: 3,
    },
  ],
  BZ_PORTLETLIST: [],
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

  const onDragStart = (value) => {
    setDragItem(value);
  };

  const onDropEnd = (value, _, e) => {
    setBzComponent((prev) =>
      update(prev, { BZ_SOURCE: { $set: value }, BZ_PORTLETLIST: { $splice: [[1, 0, dragItem]] } })
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
        <BizFlowPanel bzComponent={bzComponent} onDragStart={onDragStart} onDropEnd={onDropEnd} dragItem={dragItem} />
      </AntModal>
    </StyledMyBizFlow>
  );
};

export default MyBIzFlow;
