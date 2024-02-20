import SrchListItem from './list-item';
import StyledSrchTestList from './styled';

const SrchTestList = ({ eTestList }) => {
  return (
    <StyledSrchTestList>
      <div className="list-title">문제 은행</div>
      <div className="list-content">
        {eTestList &&
          eTestList.map((item, i) => {
            return (
              <div className="list-item">
                <SrchListItem item={item} />
              </div>
            );
          })}
      </div>
    </StyledSrchTestList>
  );
};

export default SrchTestList;
