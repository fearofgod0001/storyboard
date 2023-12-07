import { useCallback } from "react";
import update from "immutability-helper";
import { ExpiredInfo, PublishInfo, DisplayInfo, AuthInfo } from "./options";
import StyledRightPanel from "./styled";
import { MdSettings } from "react-icons/md";
const RightPanel = ({ mContent, onChange }) => {
  const { MLC_PUB_DTTM, MLC_EXPIRED_DTTM, MLC_DISPLAY } = mContent;

  const _onChange = useCallback((fieldKey, fieldValue) => {
    const nContent = update(mContent, {
      [fieldKey]: { $set: fieldValue },
    });
    console.debug("### nContent ====>", nContent);
    // onChange(nContent);
  }, []);

  return <StyledRightPanel></StyledRightPanel>;
};

export default RightPanel;
