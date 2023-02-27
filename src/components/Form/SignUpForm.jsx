import { Formik } from "formik";
import { PureComponent } from "react";
import { Display2 } from "./display/Display2";
import * as Yup from "yup";
import Axios from "../../api/auth";
import { message } from "antd";

const initialValues2 = {
  name: "",
  email: "",
  password: "hccForLife2023",
  phone: "",
  address: "",
  DOB: "",
  gender: "",
};

const validationSchema = Yup.object({
  // fname: Yup.string().required("First name is required"),
  // lname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(8, "Too short!")
  //   .test("isValid", "Invalid format!", (value) => {
  //     const upperCase = /[A-Z]/.test(value);
  //     const lowerCase = /[a-z]/.test(value);
  //     const number = /[0-9]/.test(value);
  //     const specialCharacters = /[_!#$@%&'*+/=?`{|}~^.-]/.test(value);
  //     let validConditions = 0;
  //     const requiredValidConditions = 4;
  //     const conditions = [upperCase, lowerCase, number, specialCharacters];
  //     conditions.forEach((condition) => {
  //       return condition ? validConditions++ : null;
  //     });
  //     if (validConditions === requiredValidConditions) {
  //       return true;
  //     } else return false;
  //   }),
  // pword2: Yup.string()
  //   .required("This field is required")
  //   .oneOf([Yup.ref("pword"), null], "Passwords must match"),
  // bday: Yup.date()
  //   .required("Birthday is required!")
  //   .test("dob", "You should be 18+ to register!", function (value) {
  //     return differenceInYears(new Date(), new Date(value)) >= 18;
  //   })
  //   .nullable(),
  // gender: Yup.string().required("Gender is required"),
  phone: Yup.object({
    number: Yup.string()
      .required("Phone is required")
      .test(
        "checkPhNumber",
        'Phone Number format should be "923123456"',
        (value) => {
          const isLengthValid = /[0-9]{11}/.test(value);
          const hasOnlyNums = /[A-Za-z_!#$%&'*+/=?`{|}~^.-]/.test(value);
          const noStartZero = /^[0]/.test(value);

          const conditions = [isLengthValid, hasOnlyNums, noStartZero];

          let invalidConditions = 0;

          conditions.map((option) => {
            return option ? invalidConditions++ : null;
          });

          if (invalidConditions) {
            return true;
          } else {
            return false;
          }
        }
      ),
  }),
});

export class SignUpForm extends PureComponent {
  handleSubmit = async (formProps, { resetForm }) => {
    const d = {
      ...formProps,
      phone: formProps.phone.number,
    };

    const req = await Axios.post("user/register", d);
    if (req.status === 201) {
      message.success("User added succesfully");
    }
    resetForm();
  };

  render = () => (
    <Formik
      initialValues={initialValues2}
      validationSchema={validationSchema}
      onSubmit={this.handleSubmit}
    >
      {Display2}
    </Formik>
  );
}
