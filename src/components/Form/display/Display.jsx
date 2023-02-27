import React from "react";
import { Form, Field } from "formik";
// import { dateFormat, timeFormat } from "../FieldFormats/FieldFormats";
import { AntInput, AntPassword } from "../controls/FormControls";
import { validateEmail, validatPassword } from "../validate/validate";
import "../styles.css";

export const Display = ({
  handleSubmit,
  values,
  submitCount,
  isSubmitting,
}) => (
  <Form className="form-container" onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      type="text"
      name="name"
      //   label="Name"
      placeholder="Enter Name"
      defaultValue={values.name}
      validate={validateName}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntInput}
      name="email"
      type="email"
      //   label="Email"
      placeholder="Enter Email"
      validate={validateEmail}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntPassword}
      //   showCount={true}
      name="password"
      placeholder="Enter Password"
      type="password"
      //   value={values.message}
      //   label="Message"
      //   defaultValue={values.message}
      validate={validatPassword}
      //   submitCount={submitCount}
      hasFeedback
    />

    <div className="submit-container">
      <button
        className="ant-btn ant-btn-primary"
        type="submit"
        disabled={isSubmitting}
      >
        Login
      </button>
    </div>
  </Form>
);
