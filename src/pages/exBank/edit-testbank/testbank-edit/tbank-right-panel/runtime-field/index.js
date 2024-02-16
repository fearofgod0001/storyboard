import { InputNumber } from 'antd';
import StyledRunTimeField from './styled';

const RunTimeField = ({}) => {
  const onChange = (value) => {
    console.debug(value);
  };

  return (
    <StyledRunTimeField>
      <div className="title">소요시간(분)</div>
      <div className="separator"></div>
      <InputNumber min={1} max={300} onChange={onChange} style={{ width: 180 }} />
    </StyledRunTimeField>
  );
};

export default RunTimeField;
