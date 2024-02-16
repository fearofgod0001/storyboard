import React from 'react';
import { Input } from 'antd';

export const FormInputField = ({ value, onChange, pageMode, preFix, isMock }) => {
  if (isMock) {
    return (
      <div className="form-item-view-label">
        {preFix}
        조회화면 테스트 데이터.
      </div>
    );
  }
  return pageMode === 'V' ? (
    <div className="form-item-view-label">
      {preFix}
      {value}
    </div>
  ) : (
    <Input addonBefore={preFix} value={value} onChange={onChange} />
  );
};

export default FormInputField;
