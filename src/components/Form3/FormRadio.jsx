import { Form, Radio } from 'formik-antd';
import React from 'react';

function FormRadio(props) {
  const { name, label, options, ...rest } = props;
  return (
    <Form.Item name={name} {...rest}>
      <label htmlFor={name}>{label}</label>
      <Radio.Group name={name} options={options} />
    </Form.Item>
  );
}

export default FormRadio;
