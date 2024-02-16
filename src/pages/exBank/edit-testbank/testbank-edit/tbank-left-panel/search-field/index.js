import { Input } from 'antd';
import { CheckListField } from '@/components/form-fields';

const { Search } = Input;

const SearchField = ({}) => {
  const onChangeTestType = (list) => {
    console.debug('onChangeTestType list', list);
  };

  const onSearch = (value, _e, info) => {
    console.debug('onSearch', value);
  };
  return (
    <>
      <div className="lpanel-chklist">
        <CheckListField onChangeTestType={onChangeTestType} />
      </div>

      <Search placeholder="검색" onSearch={onSearch} enterButton />
    </>
  );
};

export default SearchField;
