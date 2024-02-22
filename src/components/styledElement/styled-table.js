import styled from "styled-components";

const primaryColor = "#4491e0";
const reversePrimaryColor = "#c1b2d9";

const StyledAntdTable = (Component) => styled(Component)`
  /* thead */
  height: ${(props) =>
    props.autoHeight ? `calc(100vh - ${[props.bottomHeight]}px)` : ""};

  .ant-table-row {
    cursor: ${(props) => (props.cursor ? props.cursor : "")};
  }
  margin: 10px;

  .ant-table-container table > thead > tr:first-child > *:first-child {
    border-start-start-radius: 0px;
  }

  .ant-table-container table > thead > tr:first-child > *:last-child {
    border-start-end-radius: 0px;
  }

  .ant-table-thead > tr:first-child > th:last-child {
    border-top-right-radius: 0;
  }
  .ant-table-thead > tr > th {
    background-color: #efefef;
    color: #333;
    font-size: 12px;
    font-weight: 600;
    padding: 10px;
    border-top: 3px solid #001295;
    border-bottom: 1px solid #ddd;
  }

  /* tbody */
  .ant-table-tbody > tr > td {
    background: #ffffff;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    color: #666;
    font-size: 12px;
    .onclick-style {
      color: #1890ff;
      cursor: pointer;
      &:hover {
        font-weight: 600;
        text-decoration: underline;
      }
    }
  }
  /* checkbox */
  .ant-checkbox-indeterminate .ant-checkbox-inner:after {
    background-color: ${primaryColor};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${primaryColor};
    background-color: ${primaryColor};
  }
  .ant-checkbox-checked:after {
    /* background-color: ${primaryColor}; */
    border-color: ${primaryColor};
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${primaryColor};
  }
  /* Pagination */
  .ant-pagination-item {
    border: none;
  }
  .ant-pagination-item a {
    color: ${reversePrimaryColor};
  }
  .ant-pagination-item-active {
  }
  .ant-pagination-item-active a {
    color: #333;
  }
  .ant-table-pagination.ant-pagination {
    float: none;
    margin: 20px auto;
    text-align: center;
  }
  .ant-pagination-item-link .anticon {
    vertical-align: inherit;
  }

  &.th-tc {
    .ant-table-thead > tr > th {
      text-align: center;
    }
  }
`;

export default StyledAntdTable;
