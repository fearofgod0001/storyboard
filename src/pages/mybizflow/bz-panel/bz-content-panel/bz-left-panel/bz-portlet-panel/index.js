import StyledBzPortletPanel from "./styled";
import uuid from "react-uuid";

export const BzPortletPanel = ({ bzCompList, onDragStart }) => {
  console.debug("bzCompList", bzCompList);
  const _onDragStart = (idx, compType) => {
    onDragStart({ i: uuid(), w: 3, h: 2, scrt: ` test메모` }, compType);
  };

  return (
    <StyledBzPortletPanel>
      {bzCompList?.map((component, i) => {
        return (
          <div
            key={i}
            className="bz-component-item "
            draggable={true}
            unselectable="on"
            onDragStart={() => _onDragStart(i, component.tools)}
          >
            {component.tools}
          </div>
        );
      })}
    </StyledBzPortletPanel>
  );
};
