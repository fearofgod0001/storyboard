import styled from "styled-components";

const StyledFullScreenModal = (Component) => styled(Component)`
  top: 0px;
  margin: 0;
  box-sizing: border-box;

  .ant-modal-header {
    padding: 16px 24px;
    background: #171717;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;

    .ant-modal-title {
      color: #fff;
    }
  }
  .ant-modal,
  .ant-modal-content {
    height: 100vh;
    border-radius: 0px;
    width: calc(100vw - 10px);
    margin: 0px;
    top: 0px;
    padding: 0px;
  }
  .ant-modal-body {
    height: calc(100vh - 110px);
  }
`;

export default StyledFullScreenModal;
