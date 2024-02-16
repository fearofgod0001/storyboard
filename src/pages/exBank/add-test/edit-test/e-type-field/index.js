import { useState } from 'react';
import { Select } from 'antd';

const ETypeField = ({ value, onChange, pageMode, onChangeETestType }) => {
  const [exType, setExType] = useState(value);

  const onChangeExType = (value) => {
    setExType(value);
    onChange(value);
    onChangeETestType(value);
  };

  return (
    <div className="create-ex-format">
      <div className="ex-header">유형 :</div>
      <div style={{ width: '100%' }}>
        <Select
          defaultValue={exType}
          style={{ width: 150 }}
          onChange={onChangeExType}
          options={[
            {
              value: 'SAQ',
              label: '주관식',
            },
            {
              value: 'MCQ',
              label: '객관식',
            },
          ]}
          disabled={pageMode === 'V'}
        />
      </div>
    </div>
  );
};

export default ETypeField;
