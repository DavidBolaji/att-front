import { useContext, useState } from "react";
import { useFormik, Formik, Form, Field } from "formik";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { getCountryOptions } from "../../utils/countries";
import AuthContext from "../../store/AuthContext";

countries.registerLocale(en);

// import { countriesList } from "./countriesList";

const initialValues = {
  name: "",
  email: "",
  address: "",
  phone: "",
  DOB: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/i.test(values.phone)) {
    // errors.phone = "Invalid phone number";
  }

  if (!values.DOB) {
    errors.DOB = "Date of birth is required";
  }

  return errors;
};

const RegistrationFormComponent = () => {
  const [success, setSuccess] = useState(false);
  const ctx = useContext(AuthContext);
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values, { resetForm }) => {
      const res = ctx.onRegister({ ...values, password: "hcclifecenter" });
      if (res.status) {
        setSuccess(true);
      }
      resetForm();
    },
  });

  const handleCountrySelect = (e) => {
    formik.setFieldValue("country", e.target.value);
  };

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add User Form</h1>
      {success ? (
        <div className="bg-green-200 text-green-700 py-2 px-4 mb-4 rounded-md flex items-center">
          <FaCheckCircle className="mr-2" />
          Registration successful!
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.name}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.address}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.phone}</span>
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="DOB" className="block font-medium mb-2">
            Date of Birth
          </label>
          <input
            id="DOB"
            name="DOB"
            type="date"
            placeholder="Enter your date of birth"
            value={formik.values.DOB}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.DOB && formik.errors.DOB
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.DOB && formik.errors.DOB ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.DOB}</span>
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationFormComponent;
