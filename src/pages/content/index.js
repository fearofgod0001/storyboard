import { NamoEditor } from "@/components/namo-editor";
import StyledContent from "./styled";

const prntMessage = `
<img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"/>
`;

const TestPage = ({}) => {
  return (
    <StyledContent>
      <div className="namo-editor">
        <NamoEditor
          key="test1"
          src="http://localhost:8081/namo/index1.html"
          sender="namo1"
          prntMessage={prntMessage}
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
