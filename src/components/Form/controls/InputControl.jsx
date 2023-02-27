import { Form, Input } from "formik-antd";
import React from "react";
import styled from "@emotion/styled";

export const Label = styled.label`
  font-weight: 400;
  font-size: 16px !important;
  line-height: 24px;
  color: #111827;
  margin-bottom: 12px;
  display: block;
`;

const InputControl = ({ name, itemProps, label, ...rest }) => (
  <Form.Item {...itemProps} name={name} showValidateSuccess>
    <Label htmlFor={name}>{label}</Label>
    {rest?.type === "password" ? (
      <Input.Password
        className="h-12 rounded-[7px] w-full bg-outfit-input-bg border-outfit-input-border border "
        id={name}
        name={name}
        {...rest}
      />
    ) : (
      <Input
        className="h-12 rounded-[7px] w-full bg-outfit-input-bg border-outfit-input-border border "
        id={name}
        name={name}
        {...rest}
      />
    )}
  </Form.Item>
);

export default InputControl;
