import { StyledButton } from "@/components";
import StyledAddSelectItem from "./styled";
const AddSelectItem = ({ selectedEx, onAddTestItem }) => {
  const { EX_DESCRIP, EX_MCQ_LIST, EX_ANSWER, EX_EXPLAIN } =
    selectedEx?.EX_DATA || {};

  return (
    <StyledAddSelectItem>
      <div className="selectitem-descrip" style={{ display: "flex" }}>
        <div className="descrip-title">Q.</div>
        <div className="descrip-content">{EX_DESCRIP}</div>
      </div>
      {EX_MCQ_LIST && (
        <div className="selectitem-mcq">
          {EX_MCQ_LIST?.map((item, i) => {
            return (
              <div>
                {i + 1} . {item}
              </div>
            );
          })}
        </div>
      )}
      <div className="selectitem-ans">
        <div className="ans-title"> 정답</div>
        <div className="ans-content">{EX_ANSWER}</div>
      </div>
      <div className="selectitem-explain">
        <div className="explain-title">해설</div>
        <div className="explain-content"> {EX_EXPLAIN}</div>
      </div>
      <div className="footer">
        <StyledButton
          className="btn-primary btn-xs mr5"
          onClick={() => onAddTestItem(selectedEx)}
        >
          추가
        </StyledButton>
      </div>
    </StyledAddSelectItem>
  );
};

export default AddSelectItem;
