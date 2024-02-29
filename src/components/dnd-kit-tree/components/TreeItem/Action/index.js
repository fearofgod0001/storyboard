import React, { CSSProperties } from "react";
import classNames from "classnames";

export function Action({ active, className, cursor, style, ...props }) {
  console.debug("Action props ====>", props);
  return (
    <div
      {...props}
      style={{
        cursor,
        "--fill": active?.fill,
        "--background": active?.background,
      }}
    >
      <svg viewBox='0 0 20 20' width='12'>
        <path d='M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z'></path>
      </svg>
    </div>
    // <button
    //   {...props}
    //   tabIndex={0}
    //   style={{
    //     cursor,
    //     "--fill": active?.fill,
    //     "--background": active?.background,
    //   }}
    // />
  );
}
