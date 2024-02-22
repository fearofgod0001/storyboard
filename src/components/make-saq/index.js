import { useEffect, useState } from "react";
import StyledMakeSaq from "./styled";
import { Input } from "antd";

const { TextArea } = Input;

const MakeSaq = ({ onHandleExData }) => {
  const onChangeExTitle = (e) => {
    onHandleExData({ EX_TITLE: e.target.value });
  };

  const onChangeAnswer = (e) => {
    onHandleExData({ EX_ANSWER: e.target.value });
  };

  const onChangeDescrip = (e) => {
    onHandleExData({ EX_DESCRIPT: e.target.value });
  };

  return (
    <StyledMakeSaq>
      <div className="ques-items">
        <div className="ques-title"> 문제 내용 </div>
        <TextArea
          onChange={onChangeExTitle}
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
          onChange={onChangeAnswer}
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
          onChange={onChangeDescrip}
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
