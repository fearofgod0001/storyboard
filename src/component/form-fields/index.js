import React from 'react';

import { FormInputField } from './form-input-field';
import { FormSelectField, FormTreeSelectField } from './form-select-field';
import { AuthSelector } from './auth-selector';
import { FormChkListField } from './form-checklist-field';
import { FormInputDefaultField } from './form-input-default-field';
import { FormTextAreaField } from './form-textarea-field';
import { FormTitleField } from './form-input-title-field';

export const InputField = (props) => <FormInputField {...props} />;
export const SelectField = (props) => <FormSelectField {...props} />;
export const TreeSelectField = (props) => <FormTreeSelectField {...props} />;
export const AuthSelectorField = (props) => <AuthSelector {...props} />;
export const CheckListField = (props) => <FormChkListField {...props} />;
export const InPutDefaultField = (props) => <FormInputDefaultField {...props} />;
export const TextAreaField = (props) => <FormTextAreaField {...props} />;
export const TitleField = (props) => <FormTitleField {...props} />;
