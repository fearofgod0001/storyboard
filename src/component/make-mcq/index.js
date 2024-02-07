import { useEffect, useState } from "react";
import StyledMakeMcq from "./styled";
import { Input, Radio, InputNumber } from "antd";
import update from "immutability-helper";

const { TextArea } = Input;

const MakeMcq = ({ onHandleExData }) => {
  const [itemCount, setItemCount] = useState(5);
  const [selitem, setSelItem] = useState(1);
  const [itemArr, setItemArr] = useState([]);

  useEffect(() => {
    if (itemArr) {
      onHandleExData({ EX_ITEM_DATA: itemArr });
    }
  }, [itemArr]);

  useEffect(() => {
    if (itemCount) {
      setItemArr((prev) => {
        const curLeng = prev?.length;
        if (itemCount > curLeng) {
          const itemsToAdd = Array(itemCount - curLeng).fill();
          return update(prev, { $push: itemsToAdd });
        } else if (itemCount < curLeng) {
          return update(prev, { $splice: [[itemCount, 1]] });
        }
      });
    }
  }, [itemCount]);

  const onChangeInputNum = (cnt) => {
    setItemCount(cnt);
  };

  const onChangeItemTitle = (e, index) => {
    setItemArr((prev) => {
      return update(prev, { $splice: [[index, 1, e.target.value]] });
    });
  };

  const onChangeRadio = (item) => {
    onHandleExData({ EX_ANSWER: selitem });
    setSelItem(item.target.value);
  };

  const onChangeExDescrip = (e) => {
    onHandleExData({ EX_DESCRIPT: e.target.value });
  };

  const onChangeExExplain = (e) => {
    onHandleExData({ EX_EXPLAIN: e.target.value });
  };

  const renderRadioButtons = () => {
    return Array.from({ length: itemCount }, (_, index) => (
      <div key={index + 1} style={{ marginTop: 10 }}>
        <Radio value={index + 1}>
          {index + 1}.
          <Input
            onChange={(e) => onChangeItemTitle(e, index, itemCount)}
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
          onChange={onChangeExDescrip}
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
            onChange={onChangeInputNum}
            style={{ marginTop: 10, width: "100%" }}
          />
        </div>
      </div>

      <div className="ques-answer">
        <div className="ans-title"> 정답 </div>
        <Input
          value={selitem}
          style={{
            height: 28,
          }}
        />
      </div>
      <div className="ques-descrip">
        <div className="descrip-title"> 해설 </div>
        <TextArea
          onChange={onChangeExExplain}
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
