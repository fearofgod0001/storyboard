import styled from "styled-components";

const StyledForm = (Component) => styled(Component)`
  border-radius: 5px;
  margin: 10px;

  .ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-in-form-item {
    > span {
      font-size: 19px;
    }
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
      border-bottom: 1px solid #ededed;
    }

    .ant-form-item-label {
      flex-grow: 0;
      // background-color: #fafafa;
    }

    .ant-form-item-explain-error {
      color: #ff4d4f;
      font-weight: 600;
      font-size: 12px;
      margin-top: 5px;
    }

    .ant-form-item-label > label {
      font-size: 14px;
      position: relative;
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      width: ${(props) =>
        isNaN(props.labelwidth) ? props.labelwidth : `${props.labelwidth}px`};
      color: rgba(0, 0, 0, 0.85);
      height: 100%;
    }

    .ant-form-item-control {
      flex: 1 1;
      min-width: 0;
      padding: 0 5px;
      margin: 5px;
      font-size: 14px;

      .form-item-view-label {
        font-size: 14px;
      }
    }
  }
`;

export default StyledForm;
