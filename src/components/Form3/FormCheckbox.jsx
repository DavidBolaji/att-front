import { Checkbox } from 'formik-antd';
import React from 'react';

function FormCheckbox(props) {
  const { name, label } = props;
  return (
    <div>
      <Checkbox name={name}>{label}</Checkbox>
    </div>
  );
}

export default FormCheckbox;
