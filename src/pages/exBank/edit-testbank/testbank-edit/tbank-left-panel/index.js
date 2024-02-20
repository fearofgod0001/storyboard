import StyledTbankLeftPanel from './styled';
import LayoutField from './layout-field';
import SearchField from './search-field';

const TbankLeftPanel = ({ exColumn, exTreeData, exItemList, onChangeEnd, onRemoveTestItem }) => {
  return (
    <StyledTbankLeftPanel>
      <div className="lpanel-head">시험 항목</div>
      <div className="lpanel-search">
        <SearchField exTreeData={exTreeData} />
      </div>
      <div className="lpanel-set-layout">
        <LayoutField
          exColumn={exColumn}
          exItemList={exItemList}
          onChangeEnd={onChangeEnd}
          onRemoveTestItem={onRemoveTestItem}
        />
      </div>
    </StyledTbankLeftPanel>
  );
};

export default TbankLeftPanel;
