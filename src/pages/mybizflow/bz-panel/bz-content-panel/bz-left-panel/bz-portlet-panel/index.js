import StyledBzPortletPanel from './styled';
import uuid from 'react-uuid';

export const BzPortletPanel = ({ bzCompList, onDragStart }) => {
  const _onDragStart = (component) => {
    const { portLet_W, portLet_H, tools } = component;
    onDragStart({
      i: uuid(),
      w: portLet_W,
      h: portLet_H,
      configInfo: { portletPath: `bz-portlet/bz-${tools}-portlet`, title: tools },
    });
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
            onDragStart={() => _onDragStart(component)}
          >
            {component.tools}
          </div>
        );
      })}
    </StyledBzPortletPanel>
  );
};
