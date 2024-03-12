import { Radio } from 'antd';

const McqItemField = ({ value, onChange, index, item }) => {
  return (
    <div key={index + 1} style={{ marginTop: 5 }}>
      <Radio value={index + 1}>
        <div style={{ display: 'flex' }}>
          {index + 1}. <div className="radio-item">{item}</div>
        </div>
      </Radio>
    </div>
  );
};

export default McqItemField;
