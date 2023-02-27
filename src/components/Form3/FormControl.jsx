import React from 'react';
import FormAreaCode from './FormAreaCode';
import FormCheckbox from './FormCheckbox';
import FormDate from './FormDate';
import FormInput from './FormInput';
import FormModal from './FormModal';
import FormPassword from './FormPassword';
import FormPhone from './FormPhone';
import FormRadio from './FormRadio';
import FormSelect from './FormSelect';

function FormControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input': {
      return <FormInput {...rest} />;
    }
    case 'password': {
      return <FormPassword {...rest} />;
    }
    case 'gender': {
      return <FormSelect {...rest} />;
    }
    case 'date': {
      return <FormDate {...rest} />;
    }
    case 'phone': {
      return <FormPhone {...rest} />;
    }
    case 'areaCode': {
      return <FormAreaCode {...rest} />;
    }
    case 'checkbox': {
      return <FormCheckbox {...rest} />;
    }
    case 'modal': {
      return <FormModal {...rest} />;
    }
    case 'radio': {
      return <FormRadio {...rest} />;
    }
    default:
      return null;
  }
}

export default FormControl;
