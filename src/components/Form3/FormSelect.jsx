import React from 'react';
import { Form, Select } from 'formik-antd';

const { Option } = Select;

function FormSelect(props) {
  const { name, label, options } = props;
  return (
    <Form.Item name={name}>
      <label htmlFor={name}>{label}</label>
      <Select name={name} defaultValue={'Select Option'}>
        {options.map((option) => {
          return (
            <Option
              key={option.value}
              value={option.key}
              placeholder="Select your plan">
              {option.key}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
}

export default FormSelect;
