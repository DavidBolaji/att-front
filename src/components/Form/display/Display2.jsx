import React from "react";
import { Form, Field } from "formik";
import { AntInput, AntPassword, AntTextArea } from "../controls/FormControls";

import {
  validateEmail,
  validateName,
  validatPassword,
  validatTextarea,
} from "../validate/validate";
import FormPhone from "../../Form3/FormPhone";
import FormSelect from "../../Form3/FormSelect";
import FormDate from "../../Form3/FormDate";
import GenderControl from "../GenderControl";

const genderOptions = [
  { key: "Select Option", value: "" },
  { key: "Male", value: "male" },
  { key: "Female", value: "female" },
];

export const Display2 = ({
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
      placeholder="Enter Email"
      validate={validateEmail}
      submitCount={submitCount}
      hasFeedback
    />
    {/* <Field
      component={AntPassword}
      name="password"
      placeholder="Enter Password"
      type="password"
      validate={validatPassword}
      hasFeedback
    /> */}

    <div className="mb-8">
      <Field
        component={AntTextArea}
        name="address"
        type="text"
        placeholder="Enter Address"
        validate={validatTextarea}
        submitCount={submitCount}
        hasFeedback
      />
    </div>

    <div className="flex items-center w-full md:flex-row flex-col justify-between">
      <FormPhone
        control="phone"
        name="phone"
        label="Phone Number:"
        formik={handleSubmit}
      />

      <FormDate control="date" name="DOB" label="Birthday:" />
      <GenderControl name="gender" />
    </div>

    {/* <FormSelect
      control="plan"
      name="plan"
      options={genderOptions}
      className="w-[500px]"
    /> */}

    <div className="submit-container">
      <button
        className="text-white bg-green-300 mt-10 mb-5 ant-btn ant-btn-primary w-full px-5 py-2"
        type="submit"
        disabled={isSubmitting}
      >
        Register
      </button>
    </div>
  </Form>
);
