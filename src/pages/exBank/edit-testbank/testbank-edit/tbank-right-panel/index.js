import StyledTbankRightPanel from './styled';
import ApplyField from './apply-field';
import ColSettingField from './colsetting-field';
import DateField from './date-field';
import RunTimeField from './runtime-field';
const TbankRightPanel = ({ onHandcleColumn }) => {
  return (
    <StyledTbankRightPanel>
      <div className="rpanel-head"> 기본정보 </div>
      <div className="rpanel-start-date">
        <DateField />
      </div>
      <div className="rpanel-runtime">
        <RunTimeField />
      </div>
      <div className="rpanel-col-setting">
        <ColSettingField onHandcleColumn={onHandcleColumn} />
      </div>
      <div className="rpanel-apply">
        <ApplyField />
      </div>
    </StyledTbankRightPanel>
  );
};

export default TbankRightPanel;
