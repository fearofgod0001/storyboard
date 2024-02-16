import { Select, Space } from 'antd';
import StyledColSettingField from './styled';

const init = [
  {
    value: 1,
    label: '하나',
  },
  {
    value: 2,
    label: '둘',
  },
];

const ColSettingField = ({}) => {
  const handleChange = (value) => {
    console.debug(`selected ${value}`);
  };

  return (
    <StyledColSettingField>
      <div className="title">단설정</div>
      <div className="separator"></div>
      <Select
        defaultValue={1}
        style={{
          width: 180,
        }}
        onChange={handleChange}
        options={init}
      />
    </StyledColSettingField>
  );
};

export default ColSettingField;
