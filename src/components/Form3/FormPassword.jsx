import React from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined
} from "@ant-design/icons";
import { Form, Input } from "formik-antd";

function FormPassword(props) {
  const { name, label, _placeholder, _showmodal, ...rest } = props;
  // function validateRequired(value) {
  //   return value ? undefined : "required";
  // }
  return (
    <Form.Item
      name={name}
      {...rest}
      // validate={validateRequired}
      showValidateSuccess={true}
    >
      <label htmlFor={name}>{label}</label>{" "}
      <InfoCircleOutlined
        style={{ fontSize: "12px", color: "red", marginLeft: "2px" }}
        onClick={() => _showmodal()}
      />
      <Input.Password
        name={name}
        placeholder={_placeholder}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
    </Form.Item>
  );
}

export default FormPassword;
