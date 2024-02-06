import styled, { css } from "styled-components";

const btnRadiusNone = css`
  border-radius: 0;
`;

const btnRadius30 = css`
  border-radius: 30px;
`;

const btnRadius20 = css`
  border-radius: 20px;
`;

const btnLarge = css`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const btnSmall = css`
  padding: 0.313rem 0.844rem;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const btnXsmall = css`
  padding: 0.2rem 0.7rem;
  font-size: 0.75rem;
  line-height: 1.5;
`;

const btnXxsmall = css`
  padding: 1px 0.844rem;
  font-size: 0.7rem;
  line-height: 1.5;
`;

const btnPrimary = css`
  color: #fff;
  background-color: #4491e0;
  border-color: #fff;
  &:hover {
    color: #fff;
    background-color: #4491e0;
    border-color: #4491e0;
  }
`;

const btnSecondary = css`
  color: #fff;
  background-color: #687f96;
  border-color: #687f96;
  &:hover {
    color: #fff;
    background-color: #5b7086;
    border-color: #5b7086;
  }
`;

const btnGray = css`
  color: #fff;
  background-color: #636a78;
  border-color: #636a78;
  &:hover {
    color: #fff;
    background-color: #474c56;
    border-color: #636a78;
  }
`;

const btnGreen = css`
  color: #fff;
  background-color: #14b632;
  border-color: #636a78;
  &:hover {
    color: #fff;
    background-color: #178110;
    border-color: #636a78;
  }
`;

const btnGrayBorderWhite = css`
  color: #fff;
  background-color: #636a78;
  border-color: #fff;
  &:hover {
    color: #fff;
    background-color: #474c56;
    border-color: #636a78;
  }
`;

const btnLight = css`
  color: #333;
  background-color: #fff;
  border-color: #636a78;
  &:hover {
    color: #fff;
    background-color: #636a78;
    border-color: #636a78;
  }
`;

const btnWhite = css`
  color: #fff;
  background-color: transparent;
  border-color: #fff;
  &:hover {
    color: #4491e0;
    background-color: #fff;
  }
`;

const btnDark = css`
  color: #fff;
  background-color: #505050;
  border-color: #505050;
  /*box-shadow: 0 2px 6px 0 rgba(80, 80, 80, 0.5);*/
  &:hover {
    color: #fff;
    background-color: #3d3d3d;
    border-color: #363636;
  }
  &:focus {
    /*box-shadow: 0 0 0 0.2rem rgba(106, 106, 106, 0.5);*/
  }
`;

const StyledButton = styled.button`
  border: 1px solid transparent;
  background-color: transparent;
  cursor: pointer;
  padding: 0.4rem 1.125rem;
  font-size: 0.8125rem;
  line-height: 1.47;
  font-weight: 400;
  border-radius: 3px;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;

  .anticon {
    margin-right: 5px;
  }

  &:focus {
    border: 1px solid transparent;
  }

  &.btn-radius-none {
    ${btnRadiusNone}
  }

  &.btn-radius-30 {
    ${btnRadius30}
  }

  &.btn-radius-20 {
    ${btnRadius20}
  }

  &.btn-lg {
    ${btnLarge}
  }

  &.btn-sm {
    ${btnSmall}
  }

  &.btn-xs {
    ${btnXsmall}
  }

  &.btn-xxs {
    ${btnXxsmall}
  }

  &.btn-primary {
    ${btnPrimary}
  }

  &.btn-gray {
    ${btnGray}
  }

  &.btn-gray-whiteboarder {
    ${btnGrayBorderWhite}
  }

  &.btn-light {
    ${btnLight}
  }

  &.btn-white {
    ${btnWhite}
  }

  &.btn-dark {
    ${btnDark}
  }

  &.btn-green {
    ${btnGreen}
  }

  &.btn-secondary {
    ${btnSecondary}
  }

  &.btn-first {
    margin-right: 5px;
  }

  &.mr5 {
    margin-right: 5px;
  }

  &.mr10 {
    margin-right: 10px;
  }

  &.mr15 {
    margin-right: 15px;
  }
`;

export default StyledButton;
