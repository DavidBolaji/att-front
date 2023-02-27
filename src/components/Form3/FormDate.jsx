import React from "react";
import { DatePicker, Form } from "formik-antd";
// import moment from 'moment';

function FormDate(props) {
  const { name, label, ...rest } = props;
  return (
    <Form.Item name={name} {...rest} className="w-2/4">
      {/* <label htmlFor={name}>{label}</label> */}
      <DatePicker
        format={"MM/DD/YYYY"}
        name={name}
        // placeholder={moment()}
        className="w-full"
      />
    </Form.Item>
  );
}

export default FormDate;
