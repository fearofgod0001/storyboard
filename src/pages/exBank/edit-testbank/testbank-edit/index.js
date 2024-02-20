import StyledTestBankEdit from "./styled";
import TbankCenterPanel from "./tbank-center-panel";
import TbankLeftPanel from "./tbank-left-panel";
import TbankRightPanel from "./tbank-right-panel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const TestBankEdit = ({
  exColumn,
  onDragEnd,
  exTreeData,
  exItemList,
  onAddTestItem,
  onHandcleColumn,
  isOpenSelectItem,
  onRemoveTestItem,
  onHandleSelectItem,
}) => {
  return (
    <StyledTestBankEdit>
      <DndProvider backend={HTML5Backend}>
        <div className="tbank-left-panel">
          <TbankLeftPanel
            exColumn={exColumn}
            onDragEnd={onDragEnd}
            exTreeData={exTreeData}
            exItemList={exItemList}
            onAddTestItem={onAddTestItem}
            onRemoveTestItem={onRemoveTestItem}
          />
        </div>
        <div className="tbank-center-panel">
          <TbankCenterPanel
            exColumn={exColumn}
            exTreeData={exTreeData}
            exItemList={exItemList}
            onAddTestItem={onAddTestItem}
            onRemoveTestItem={onRemoveTestItem}
            isOpenSelectItem={isOpenSelectItem}
            onHandleSelectItem={onHandleSelectItem}
          />
        </div>
        <div className="tbank-right-panel">
          <TbankRightPanel onHandcleColumn={onHandcleColumn} />
        </div>
      </DndProvider>
    </StyledTestBankEdit>
  );
};

export default TestBankEdit;
