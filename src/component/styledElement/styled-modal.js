import styled from "styled-components";

const StyledModal = (Component) => styled(Component)`
  font-size: 12px;

  .ant-modal-header {
    padding: 16px 24px;
    background: #060056;
    margin-bottom: 0px;
    .ant-modal-title {
      color: #fff;
    }
  }

  .ant-modal-body {
    padding: 10px;
    height: ${(props) => (props.autoHeight ? "calc(100vh - 130px)" : "100%")};
    overflow-y: auto;
  }

  .ant-modal-content {
    position: relative;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 0;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    pointer-events: auto;
    padding: 0px;
    .ant-modal-close-x {
      color: #fff;
    }
  }
`;

export default StyledModal;
