import { NamoEditor } from "@/components/namo-editor";
import StyledContent from "./styled";

const prntMessage1 = `
<img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"/>
`;

const prntMessage2 = `
<table border="1">
<caption>음식</caption>
<tr>
  <th>한식</th>
  <th>양식</th>
  <th>중식</th>
</tr>
<tr>
  <td>불고기</td>
  <td>피자</td>
  <td>짜장면</td>
</tr>
<tr>
  <td>청국장</td>
  <td>오일파스타</td>
  <td>짬뽕</td>
</tr>
<tr>
  <td>우렁쌈밥</td>
  <td>스테이크</td>
  <td>탕수육</td>
</tr>
</table>
`;

const TestPage = ({}) => {
  return (
    <StyledContent>
      <div className="namo-editor">
        <NamoEditor
          key="test1"
          src="http://localhost:8081/namo/index1.html"
          sender="namo1"
          prntMessage={prntMessage1}
        />
      </div>
      <div className="namo-editor">
        <NamoEditor
          key="test2"
          src="http://localhost:8081/namo/index2.html"
          sender="namo2"
          prntMessage={prntMessage2}
        />
      </div>
    </StyledContent>
  );
};

export default TestPage;
