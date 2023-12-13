import React, { useEffect, useRef } from "react";
import { DefaultIndex } from "./manual-index";
import { StyledIndexPanel } from "./styled";

const IndexContainer = ({
  tabKey,
  numberingList,
  tocList = [],
  tocContentInfo,
  onChangeTocTitle,
  onChangeContent,
  handleContextMenu,
  selectTreeData,
}) => {
  const tocListRef = useRef();
  const _handleContextMenu = (e, item) => {
    handleContextMenu(e, item);
  };

  useEffect(() => {
    if (selectTreeData) {
      tocListRef[selectTreeData.key].scrollIntoView({ behavior: "smooth" });
    }
  }, [selectTreeData]);

  return (
    <StyledIndexPanel>
      {tocList &&
        Object.keys(tocList).map((tab) => {
          const display = tabKey === tab ? "" : "none";
          return (
            <div style={{ display }}>
              {tocList[tab].map((item, index) => {
                return (
                  <div
                    onContextMenu={(e) => _handleContextMenu(e, item)}
                    ref={(el) => {
                      tocListRef[item.TOCID] = el;
                    }}
                  >
                    <DefaultIndex
                      className="toc-style"
                      key={`index-${item.TOCID}`}
                      numberingList={numberingList}
                      offset={index}
                      item={item}
                      onChangeTocTitle={onChangeTocTitle}
                      onChangeContent={onChangeContent}
                      contentInfo={tocContentInfo[tab][item.TOCID]}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
    </StyledIndexPanel>
  );
};

export default IndexContainer;
