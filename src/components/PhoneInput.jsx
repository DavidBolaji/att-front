import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { getCountryOptions } from "../utils/countries";
import PhoneNumber from "awesome-phonenumber";

const { Option } = Select;

const PhoneInput = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    if (value) {
      const phoneNumber = new PhoneNumber(value);
      setCountryCode(phoneNumber.getRegionCode());
    }
  }, [value]);

  const handleCountryChange = (value) => {
    setCountryCode(value);
    onChange(
      `+${PhoneNumber.getCountryCodeForRegionCode(value)}${
        value ? " " : ""
      }${value}`
    );
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = new PhoneNumber(e.target.value, countryCode);
    onChange(phoneNumber.getNumber());
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <Input
        id={name}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={handlePhoneChange}
        placeholder="Enter phone number"
        addonBefore={
          <Select
            value={countryCode}
            onChange={handleCountryChange}
            style={{ width: 80 }}
          >
            {getCountryOptions().map((option) => (
              <Option key={option.value} value={option.value}>
                {option.value}
              </Option>
            ))}
          </Select>
        }
        className={touched && error ? "border-red-500" : ""}
      />
      {touched && error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default PhoneInput;
