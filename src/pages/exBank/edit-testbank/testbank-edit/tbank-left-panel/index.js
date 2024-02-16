import StyledTbankLeftPanel from './styled';
import LayoutField from './layout-field';
import SearchField from './search-field';

const TbankLeftPanel = ({}) => {
  return (
    <StyledTbankLeftPanel>
      <div className="lpanel-head">시험 항목</div>
      <div className="lpanel-search">
        <SearchField />
      </div>
      <div className="lpanel-set-layout">
        <LayoutField />
      </div>
    </StyledTbankLeftPanel>
  );
};

export default TbankLeftPanel;
