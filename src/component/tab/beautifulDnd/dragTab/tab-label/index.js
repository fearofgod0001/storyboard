import { useEffect, useRef } from "react";
import { Input } from "./styled";

export const TabLabel = ({ value, isFocus, onChange, onKeyDowns }) => {
  const defaultValue = useRef(value);
  const tabRef = useRef();

  useEffect(() => {
    if (isFocus && tabRef.current) {
      tabRef.current.focus();
    }
  }, [isFocus, tabRef]);

  const _onChange = (event) => {
    if (typeof onChange === "function") {
      onChange(event.target.innerHTML);
    }
  };

  return (
    <Input
      contentEditable
      ref={tabRef}
      onInput={_onChange}
      onKeyDown={onKeyDowns}
    >
      {defaultValue.current}
    </Input>
  );
};
