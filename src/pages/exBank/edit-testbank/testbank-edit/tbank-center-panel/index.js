import StyledTbankCenterPanel from './styled';
import { TitleField } from '@/components/form-fields';

const TbankCenterPanel = ({}) => {
  return (
    <StyledTbankCenterPanel>
      <div className="cpanel-title">
        <TitleField placeholder="시험명을 입력해주세요" />
      </div>
      <div className="test-item"></div>
    </StyledTbankCenterPanel>
  );
};

export default TbankCenterPanel;
