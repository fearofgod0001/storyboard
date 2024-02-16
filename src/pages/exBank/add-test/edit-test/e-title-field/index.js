import { useState } from 'react';
import { Input } from 'antd';

const ETitleField = ({ value, onChange, pageMode }) => {
  const [exTitle, setExTitle] = useState(value);

  const onChangeExTitle = (e) => {
    setExTitle(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="create-ex-format">
      <div className="ex-header">제목 :</div>
      <Input onChange={onChangeExTitle} value={exTitle} disabled={pageMode === 'V'} />
    </div>
  );
};

export default ETitleField;
