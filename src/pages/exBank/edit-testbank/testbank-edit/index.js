import StyledTestBankEdit from './styled';
import TbankCenterPanel from './tbank-center-panel';
import TbankLeftPanel from './tbank-left-panel';
import TbankRightPanel from './tbank-right-panel';
const TestBankEdit = ({}) => {
  return (
    <StyledTestBankEdit>
      <div className="tbank-left-panel">
        <TbankLeftPanel />
      </div>
      <div className="tbank-center-panel">
        <TbankCenterPanel />
      </div>
      <div className="tbank-right-panel">
        <TbankRightPanel />
      </div>
    </StyledTestBankEdit>
  );
};

export default TestBankEdit;
