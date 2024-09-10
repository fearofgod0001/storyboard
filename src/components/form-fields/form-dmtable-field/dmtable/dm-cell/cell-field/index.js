import { EditorField } from './editor-field';
import { InputField } from './input-field';
import { CheckboxField } from './checkbox-field';
export const Editor = (props) => <EditorField {...props} />;
export const Input = (props) => <InputField {...props} />;
export const Checkbox = (props) => <CheckboxField {...props} />;
