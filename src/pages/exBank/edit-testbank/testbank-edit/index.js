import StyledTestBankEdit from './styled';
import TbankCenterPanel from './tbank-center-panel';
import TbankLeftPanel from './tbank-left-panel';
import TbankRightPanel from './tbank-right-panel';
const TestBankEdit = ({
  exColumn,
  exItemList,
  onChangeEnd,
  onAddTestItem,
  onHandcleColumn,
  isOpenSelectItem,
  onRemoveTestItem,
  onHandleSelectItem,
}) => {
  return (
    <StyledTestBankEdit>
      <div className="tbank-left-panel">
        <TbankLeftPanel
          exColumn={exColumn}
          exItemList={exItemList}
          onChangeEnd={onChangeEnd}
          onRemoveTestItem={onRemoveTestItem}
        />
      </div>
      <div className="tbank-center-panel">
        <TbankCenterPanel
          exColumn={exColumn}
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
    </StyledTestBankEdit>
  );
};

export default TestBankEdit;
