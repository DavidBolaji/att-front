import React from "react";
import { Form, Input } from "formik-antd";
import { Col, Row } from "antd";
import PhoneInput from "react-phone-input-2";
import { useFormikContext } from "formik";

import "react-phone-input-2/lib/style.css";
import "./styles.css";

function FormPhone(props) {
  const { name, label, _placeholder, formik, ...rest } = props;
  // console.log(name);
  // console.log(formik);
  const { setFieldValue, field } = useFormikContext();
  return (
    <Form.Item name="phone.number" {...rest} showValidateSuccess={true}>
      <Row span={24} className="relative">
        {/* <Col xs={24}>
          <label>{label}</label>
        </Col> */}
        <Col xs={5} md={4}>
          <PhoneInput
            name="name.areaCode"
            country={"ng"}
            {...field}
            onChange={(value) => setFieldValue("phone.areaCode", value)}
          />
        </Col>
        <Col
          xs={18}
          md={20}
          style={{
            position: "absolute",
            right: "-22px",
          }}
        >
          <Input
            type="tel"
            name="phone.number"
            className="borderless"
            // className="styles_height35 styles_delBorder"
          />
        </Col>
      </Row>
    </Form.Item>
  );
}

export default FormPhone;
