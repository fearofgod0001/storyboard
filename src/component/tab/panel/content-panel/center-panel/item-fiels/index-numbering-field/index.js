import { StyledIndexNumbering } from './styled';

const IndexNumbringField = ({ numberingList, item }) => {
  return (
    <StyledIndexNumbering>{numberingList[item.TOCID] && numberingList[item.TOCID].Numbering}</StyledIndexNumbering>
  );
};

export default IndexNumbringField;
