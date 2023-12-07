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

  return (
    <StyledRightPanel>
      <div className="header">
        <MdSettings />
        매뉴얼 설정
      </div>
      <div className="options">
        <div className="option-item">
          <PublishInfo
            fieldKey={"MLC_PUB_DTTM"}
            fieldValue={MLC_PUB_DTTM}
            onChange={_onChange}
          />
        </div>
        <div className="option-item">
          <ExpiredInfo
            fieldKey={"MLC_EXPIRED_DTTM"}
            fieldValue={MLC_EXPIRED_DTTM}
            onChange={_onChange}
          />
        </div>
        <div className="option-item">
          <DisplayInfo
            fieldKey={"MLC_DISPLAY"}
            fieldValue={MLC_DISPLAY}
            onChange={_onChange}
          />
        </div>
        <div className="nomargin">
          <AuthInfo
            fieldKey={"MLC_DISPLAY"}
            fieldValue={MLC_DISPLAY}
            onChange={_onChange}
          />
        </div>
      </div>
    </StyledRightPanel>
  );
};

export default RightPanel;
