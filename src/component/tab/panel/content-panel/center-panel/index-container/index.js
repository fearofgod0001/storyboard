import ManualIndex from "./manual-index-chapter";
import ManulIndexdSection from "./manul-indexd-section";
import ManualIndexSubSection from "./manual-index-sub-section";

const IndexContainer = ({
  numberingList,
  IndexList = [],
  tocContentInfo,
  onChangeTocTitle,
  onChangeContent,
  handleContextMenu,
}) => {
  const _handleContextMenu = (e, item) => {
    handleContextMenu(e, item);
  };

  return (
    <div>
      {IndexList.map((item, index) => {
        switch (item.INDENT) {
          case 1:
            return (
              <div onContextMenu={(e) => _handleContextMenu(e, item)}>
                <ManualIndex
                  numberingList={numberingList}
                  key={`index-${item.TOCID}`}
                  offset={index}
                  item={item}
                  onChangeTocTitle={onChangeTocTitle}
                  onChangeContent={onChangeContent}
                  contentInfo={tocContentInfo[item.TOCID]}
                />
              </div>
            );
          case 3:
            return (
              <div onContextMenu={(e) => _handleContextMenu(e, item)}>
                <ManualIndexSubSection
                  numberingList={numberingList}
                  key={`index-${item.TOCID}`}
                  offset={index}
                  item={item}
                  onChangeTocTitle={onChangeTocTitle}
                  onChangeContent={onChangeContent}
                  contentInfo={tocContentInfo[item.TOCID]}
                />
              </div>
            );
          default:
            return (
              <div onContextMenu={(e) => _handleContextMenu(e, item)}>
                <ManulIndexdSection
                  numberingList={numberingList}
                  key={`index-${item.TOCID}`}
                  offset={index}
                  item={item}
                  onChangeTocTitle={onChangeTocTitle}
                  onChangeContent={onChangeContent}
                  contentInfo={tocContentInfo[item.TOCID]}
                />
              </div>
            );
        }
      })}
    </div>
  );
};

export default IndexContainer;
