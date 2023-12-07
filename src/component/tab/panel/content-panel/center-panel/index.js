import IndexContainer from './index-container';
import TitleField from './item-fiels/title-field';
import { StyledCenter } from './styled';

const CenterPanel = ({
  numberingList,
  tocListAsTree,
  tocContentInfo,
  onChangeTitle,
  onChangeTocTitle,
  onChangeContent,
  handleContextMenu,
}) => {
  return (
    <StyledCenter>
      <TitleField onChangeTitle={onChangeTitle} />
      <IndexContainer
        numberingList={numberingList}
        IndexList={tocListAsTree}
        tocContentInfo={tocContentInfo}
        onChangeTocTitle={onChangeTocTitle}
        onChangeContent={onChangeContent}
        handleContextMenu={handleContextMenu}
      />
    </StyledCenter>
  );
};

export default CenterPanel;
