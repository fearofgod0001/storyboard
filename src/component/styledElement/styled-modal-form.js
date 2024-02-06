import styled from "styled-components";

const StyledModalForm = (Component) => styled(Component)`
  border-top: 2px solid #000;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  position: relative;
  background-color: #fff;
  overflow-y: auto;
  max-height: calc(100vh - 160px);
  .form-panel {
    border-top: 2px solid #000;
    margin: 15px;
    display: table;
  }

  .ant-form-item {
    box-sizing: border-box;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: "tnum";
    margin: 0px;
    vertical-align: top;

    .ant-row {
      flex-flow: row wrap;
      min-width: 0;
      border-bottom: 1px solid #d9d9d9;
    }

    .ant-form-item-label {
      flex-grow: 0;
      background-color: #fafafa;
    }

    .ant-form-item-explain-error {
      color: #ff4d4f;
      font-weight: 600;
      font-size: 12px;
      margin-top: 5px;
    }

    .ant-form-item-label > label {
      position: relative;
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      width: ${(props) =>
        isNaN(props.labelwidth) ? props.labelwidth : `${props.labelwidth}px`};
      color: rgba(0, 0, 0, 0.85);
      font-size: 12px;
      height: 100%;
      font-weight: 600;
      padding: 10px;
    }

    .ant-form-item-control {
      flex: 1 1;
      min-width: 0;
      margin: 5px;

      .view {
        margin-left: 12px;
      }

      .ant-input {
        font-size: 12px;
      }

      .ant-select-selector {
        font-size: 12px;
      }
    }

    .layout-wrap {
      display: flex;
      -webkit-box-pack: center;
      justify-content: space-around;

      .ant-radio-group {
        display: contents;
        .ant-radio-button-wrapper {
          display: inline-table;
          height: 32px;
          margin: 0;
          padding: 0 15px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 14px;
          line-height: 30px;
          background: #fff;
          border-style: solid;
          cursor: pointer;
          transition: color 0.3s, background 0.3s, border-color 0.3s,
            box-shadow 0.3s;
          &.ant-radio-button-wrapper-checked:not(
              [class*=" ant-radio-button-wrapper-disabled"]
            ).ant-radio-button-wrapper:first-child,
          &.ant-radio-button-wrapper-checked:not(
              .ant-radio-button-wrapper-disabled
            ):active,
          &.ant-radio-button-wrapper-checked:not(
              .ant-radio-button-wrapper-disabled
            ) {
            color: #4491e0;
            border-color: red;
            border-width: 2px;
          }
        }
      }
    }
  }
`;

export default StyledModalForm;
