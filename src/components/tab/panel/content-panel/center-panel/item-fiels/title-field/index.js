import { Input } from 'antd';
import { StyledTitle } from './styled';

const TitleField = ({ onChangeTitle }) => {
  return (
    <StyledTitle>
      <div className="title" style={{ display: 'relatve' }}>
        <Input key="formTitle" placeholder="매뉴얼 제목을 입력해주세요" onChange={onChangeTitle} />
      </div>
    </StyledTitle>
  );
};

export default TitleField;
