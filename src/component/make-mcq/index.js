import { useEffect, useState } from "react";
import StyledMakeMcq from "./styled";
import { Input, Radio, InputNumber } from "antd";

const { TextArea } = Input;

const MakeMcq = ({}) => {
  const [itemCount, setItemCount] = useState(5);
  const [selitem, setSelItem] = useState(1);

  const onChange = (cnt) => {
    console.debug("changed", cnt);
    setItemCount(cnt);
  };

  const onChangeRadio = (item) => {
    console.debug("onChangeRadio", item.target.value);
    setSelItem(item.target.value);
  };

  useEffect(() => {}, [itemCount]);

  const renderRadioButtons = () => {
    return Array.from({ length: itemCount }, (_, index) => (
      <div key={index + 1} style={{ marginTop: 10 }}>
        <Radio value={index + 1}>
          {index + 1}.
          <Input
            style={{
              width: 380,
              height: 28,
              marginLeft: 10,
            }}
          />
        </Radio>
      </div>
    ));
  };

  return (
    <StyledMakeMcq>
      <div className="ques-content">
        <div className="ques-title"> 문제 내용 </div>
        <TextArea
          style={{
            resize: "none",
            height: 50,
            backgroundColor: "white",
          }}
        />
      </div>
      <div className="item-count">
        <div className="item-title">항목 갯수</div>
        <div style={{ display: "flex" }}>
          <Radio.Group onChange={onChangeRadio} value={selitem}>
            {renderRadioButtons(itemCount)}
          </Radio.Group>

          <InputNumber
            min={1}
            max={5}
            defaultValue={5}
            onChange={onChange}
            style={{ marginTop: 10, width: "100%" }}
          />
        </div>
      </div>

      <div className="ques-answer">
        <div className="ans-title"> 정답 </div>
        <Input
          style={{
            height: 28,
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
    </StyledMakeMcq>
  );
};

export default MakeMcq;
