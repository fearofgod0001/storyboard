import { InPutDefaultField, TextAreaField } from '@/components/form-fields';
import { useEffect, useState } from 'react';
import StyledETestItem from './styled';
import ItemMcList from './item-mc-list';

const ETestItem = ({ value, onChange, testType, pageMode, selectedEx }) => {
  const { EX_DESCRIP, EX_MCQ_LIST, EX_ANSWER, EX_EXPLAIN } = value || {};

  console.debug('ETestItem value', value);

  const [tstType, setTstType] = useState();
  const [mcqAns, setMcqAns] = useState();

  //type이 객관식(MCQ)이냐 아니냐에 따라서 보여주는게 다르다
  useEffect(() => {
    const { EX_TYPE } = selectedEx || {};
    if (testType) {
      setTstType(testType);
    } else {
      setTstType(EX_TYPE);
    }
  }, [testType, selectedEx]);

  const onChangeDescrip = (val) => {
    onChange({ ...value, EX_DESCRIP: val.target.value });
  };

  const onChangeMcqList = (list) => {
    onChange({ ...value, EX_MCQ_LIST: list });
  };

  const onChangeAnswer = (val) => {
    onChange({ ...value, EX_ANSWER: val.target.value });
  };

  const onChangeExplain = (val) => {
    onChange({ ...value, EX_EXPLAIN: val.target.value });
  };

  //객관식 문제생성 Radio에서 고른 정답을 설정하는 함수
  const onChangeMcaAns = (ans) => {
    setMcqAns(ans);
    onChange({ ...value, EX_ANSWER: ans });
  };

  return (
    <StyledETestItem>
      <div className="qa-descrip">
        <div className="descrip-title"> 문제 내용</div>
        <TextAreaField pageMode={pageMode} onChange={onChangeDescrip} value={EX_DESCRIP} />
      </div>

      {tstType === 'MCQ' && (
        <div className="item-count">
          <div className="item-title">항목 갯수</div>
          <div style={{ display: 'flex' }}>
            <ItemMcList
              mcqAns={mcqAns}
              pageMode={pageMode}
              onChangeMcaAns={onChangeMcaAns}
              onChange={onChangeMcqList}
              value={EX_MCQ_LIST}
            />
          </div>
        </div>
      )}

      <div className="qa-answer">
        <div className="ans-title"> 정답 </div>
        <InPutDefaultField pageMode={pageMode} onChange={onChangeAnswer} value={EX_ANSWER} />
      </div>

      <div className="qa-explain">
        <div className="explain-title"> 해설 </div>
        <TextAreaField pageMode={pageMode} onChange={onChangeExplain} value={EX_EXPLAIN} />
      </div>
    </StyledETestItem>
  );
};

export default ETestItem;
