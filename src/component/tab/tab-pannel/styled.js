import styled from "styled-components";

export const StyledTabsPanel = styled.div`
  display: flex;
  padding: 0px;
  background-color: #dee1e6;

  .tab-icon {
    padding: 5px 15px;
    display: flex;
    align-items: center;
  }
`;

export const StyledTabs = (Component) => styled(Component)`
  .ant-tabs-nav {
    margin: 0px;
  }
`;
