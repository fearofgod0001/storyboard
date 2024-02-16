import { CheckListField } from '@/components/form-fields';

const ChkListField = ({}) => {
  const onChangeTestType = (list) => {
    console.debug('onChangeTestType list', list);
  };

  return (
    <>
      <CheckListField onChangeTestType={onChangeTestType} />
    </>
  );
};

export default ChkListField;
