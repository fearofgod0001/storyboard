import { useEffect, useState } from "react";
import StyledMakeSaq from "./styled";
import { Input } from "antd";

const { TextArea } = Input;

const MakeSaq = ({}) => {
  const onChange = (cnt) => {
    console.debug("changed", cnt);
  };

  return (
    <StyledMakeSaq>
      <div className="ques-items">
        <div className="ques-title"> 문제 내용 </div>
        <TextArea
          style={{
            resize: "none",

            height: 80,
            backgroundColor: "white",
          }}
        />
      </div>

      <div className="ques-answer">
        <div className="ans-title"> 정답 </div>
        <TextArea
          style={{
            resize: "none",
            height: 80,
            backgroundColor: "white",
          }}
        />
      </div>

      <div className="ques-descrip">
        <div className="descrip-title"> 해설 </div>
        <TextArea
          style={{
            resize: "none",
            height: 80,
            backgroundColor: "white",
          }}
        />
      </div>
    </StyledMakeSaq>
  );
};

export default MakeSaq;
