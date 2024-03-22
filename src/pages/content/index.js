import { NamoEditor } from "@/components/namo-editor";
import StyledContent from "./styled";

const TestPage = ({}) => {
  return (
    <StyledContent>
      <div className="namo-editor">
        <NamoEditor
          key="test1"
          src="http://localhost:8081/namo/index1.html"
          sender="namo1"
        />
      </div>
      <div className="namo-editor">
        <NamoEditor
          key="test2"
          src="http://localhost:8081/namo/index2.html"
          sender="namo2"
        />
      </div>
    </StyledContent>
  );
};

export default TestPage;
