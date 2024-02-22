import { useEffect, useRef } from "react";
import { Input } from "./styled";
import debounce from "lodash/debounce";

export const TabLabel = ({
  placeholder,
  value,
  isFocus,
  onChange,
  onKeyDowns,
}) => {
  const defaultValue = useRef(value);
  const tabRef = useRef();

  useEffect(() => {
    if (isFocus && tabRef.current) {
      tabRef.current.focus();
    }
  }, [isFocus, tabRef]);

  const debounceOnChange = debounce((event) => {
    if (typeof onChange === "function") {
      onChange(event.target.innerText);
    }
  }, 0);

  return (
    <Input
      contentEditable
      ref={tabRef}
      onInput={debounceOnChange}
      onKeyUp={onKeyDowns}
    >
      {defaultValue.current}
    </Input>
  );
};
