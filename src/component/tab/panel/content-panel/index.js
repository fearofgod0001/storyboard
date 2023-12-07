import { useState } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";
import LeftPanel from "./left-panel";
import CenterPanel from "./center-panel";
import RightPanel from "./right-panel";
import { StyledContent } from "./styled";

const ContentPanel = ({
  mContent,
  numberingList,
  tocList,
  tocContentInfo,
  onChangeTree,
  onCreateIndex,
  onChangeTitle,
  onChangeTocTitle,
  onChangeContent,
  onAddManualDownIndex,
  onAddManualNextIndex,
  onDeleteManualIndex,
}) => {
  const [_item, setItem] = useState();

  const MENU_ID = "manualContext";
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  //우클릭으로 manual index의 정보인 itemw정보를 받아옴
  //받아온 item 을 setTime 에 넣어 선언한다.
  const handleContextMenu = (e, item) => {
    show({ event: e });
    setItem(item);
  };

  return (
    <StyledContent>
      <div className="left-panel">
        <LeftPanel
          tocListAsTree={tocList}
          onCreateIndex={onCreateIndex}
          onChangeTree={onChangeTree}
          numberingList={numberingList}
        />
      </div>
      <div className="center-panel" id="center-panel">
        <CenterPanel
          numberingList={numberingList}
          tocListAsTree={tocList}
          tocContentInfo={tocContentInfo}
          onChangeTitle={onChangeTitle}
          onChangeTocTitle={onChangeTocTitle}
          onChangeContent={onChangeContent}
          handleContextMenu={handleContextMenu}
        />
      </div>
      <div className="right-panel">
        <RightPanel mContent={mContent} />
      </div>
      <Menu
        id={MENU_ID}
        animation={{ enter: "scale", exit: "fade" }}
        theme="dark"
        style={{ minWidth: "120px" }}
      >
        <Item>
          <i
            class="fa-regular fa-rectangle-list"
            style={{ marginRight: "7px" }}
          ></i>
          목차명 : {_item && _item.TITLE}
        </Item>
        {_item && _item.INDENT < 3 && (
          <Item onClick={() => onAddManualDownIndex(_item)}>
            <i
              class="fa-solid fa-folder-tree fa-lg"
              style={{ marginRight: "7px" }}
            ></i>
            하위 목차 생성
          </Item>
        )}
        <Item onClick={() => onAddManualNextIndex(_item)}>
          <i
            class="fa-solid fa-folder-plus fa-lg"
            style={{ marginRight: "7px" }}
          ></i>
          다음 목차 생성
        </Item>
        <Item onClick={() => onDeleteManualIndex(_item)}>
          <i class="fa-solid fa-trash fa-lg" style={{ marginRight: "7px" }}></i>
          현재 목차 삭제
        </Item>
      </Menu>
    </StyledContent>
  );
};

export default ContentPanel;
