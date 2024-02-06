import React from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import StyledWrapApp from "../styledElement/styled-wrap-app";

export const ContentPannel = ({ pathInfo, renderButton, children }) => {
  return (
    <StyledWrapApp>
      <div className="app-Path">
        <div className="path-Info">
          <AppstoreOutlined style={{ marginRight: "5px" }} />
          {pathInfo}
        </div>
        <div className="btn-Wrap">
          {typeof renderButton === "function" && renderButton()}
        </div>
      </div>
      <div className="app-Wrap">{children}</div>
    </StyledWrapApp>
  );
};
