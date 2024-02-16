import styled from 'styled-components';

export const StyledCard = (Component) => styled(Component)`
  margin: 11px;
  .ant-card-head {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 35px;
    margin-bottom: -1px;
    padding: 0 24px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 0;
    background-color: #efefef;
  }

  .ant-card-head-title {
    font-size: 14px;
  }

  .ant-card-body {
    padding: 0px;
  }
`;
