import { useContext, useState } from "react";
import { useFormik, Formik, Form, Field } from "formik";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { getCountryOptions } from "../../utils/countries";
import AuthContext from "../../store/AuthContext";

countries.registerLocale(en);

const genderOptions = [
  {value: '', label: 'Select Gender'},
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
];

const roleOptions = [
  {value: '', label: 'Select Role'},
  { value: 'Member', label: 'Member' },
  { value: 'Worker', label: 'Worker' },
];


// import { countriesList } from "./countriesList";
["firstName","lastName",	"gender", "address", "nbusStop", "addressGroup", "email",	"phone", "DOB",	"month", "role", "occupation"];
const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  address: "",
  nbusStop: "",
  addressGroup: "",
  email: "",
  phone: "",
  DOB: "",
  month: "",
  role: "",
  occupation: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.name = "First Name is required";
  }

  if (!values.lastName) {
    errors.name = "Last Name is required";
  }

  if (!values.gender) {
    errors.name = "Gender is required";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }


  if (!values.nbusStop) {
    errors.name = "Nearest bus Stop is required";
  }

  if (!values.addressGroup) {
    errors.name = "Gender is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }


  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/i.test(values.phone)) {
    // errors.phone = "Invalid phone number";
  }

  if (!values.DOB) {
    errors.DOB = "Date of birth is required";
  }


  if (!values.month) {
    errors.month = "Month of birth is required";
  }

  if (!values.role) {
    errors.role = "Role is required";
  }

  if (!values.occupation) {
    errors.occupation = "Occupation is required";
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
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.firstName && formik.errors.firstName
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.firstName}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.lastName}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
            <label htmlFor="gender" className="block font-medium mb-2">Gender</label>
            <select name="gender" id="gender" onChange={formik.handleChange} value={formik.values.gender} className={`w-full p-2 rounded-md border ${
              formik.touched.gender && formik.errors.gender
                ? "border-red-500"
                : "border-gray-300"
            }`}>
              {genderOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {formik.touched.gender && formik.errors.gender ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.gender}</span>
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
          <label htmlFor="address" className="block font-medium mb-2">
            Nearest Bus Stop
          </label>
          <textarea
            id="nbusStop"
            name="nbusStop"
            placeholder="Enter your Nearest Bus stop"
            value={formik.values.nbusStop}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.nbusStop && formik.errors.nbusStop
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.nbusStop && formik.errors.nbusStop ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.nbusStop}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Address Group
          </label>
          <input
            id="addressGroup"
            name="addressGroup"
            type="text"
            placeholder="Enter your Address Group"
            value={formik.values.addressGroup}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.addressGroup && formik.errors.addressGroup
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.addressGroup && formik.errors.addressGroup ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.addressGroup}</span>
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
            type="text"
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
        <div className="mb-4">
            <label htmlFor="month" className="block font-medium mb-2">Month (MM)</label>
            <input
              type="text"
              name="month"
              id="month"
              placeholder="Enter Month"
              // maxLength="2" // restrict input to 2 characters
              // pattern="^(0?[1-9]|1[0-2])$" // enforce "MM" format with HTML5 validation
              value={formik.values.month}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.month && formik.errors.month
                ? "border-red-500"
                : "border-gray-300"
            }`}
            />
             {formik.touched.month && formik.errors.month ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.month}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
            <label htmlFor="role" className="block font-medium mb-2">Role</label>
            <select name="role" id="role" onChange={formik.handleChange} value={formik.values.role} className={`w-full p-2 rounded-md border ${
              formik.touched.role && formik.errors.role
                ? "border-red-500"
                : "border-gray-300"
            }`}>
              {roleOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {formik.touched.role && formik.errors.role ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.role}</span>
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Occupation
          </label>
          <input
            id="occupation"
            name="occupation"
            type="text"
            placeholder="Enter your occupation"
            value={formik.values.occupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 rounded-md border ${
              formik.touched.occupation && formik.errors.occupation
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.occupation && formik.errors.occupation ? (
            <div className="flex items-center mt-1">
              <FaTimesCircle className="text-red-500 mr-2" />
              <span className="text-red-500">{formik.errors.occupation}</span>
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
