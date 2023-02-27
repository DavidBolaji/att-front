import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
// import { Label } from 'components/Form/InputControl';
import { useFormikContext } from "formik";
import { Form } from "formik-antd";
import { useState } from "react";
import en from "world_countries_lists/data/countries/en/world.json";
// import { Label } from "./controls/InputControl";
// import { Label } from './controls/InputControl';
import { validatePhoneNumber } from "./utils/helpers";

const FormPhone = ({ name, itemProps, label, ...rest }) => {
  const [phoneVal, setPhoneVal] = useState({ code: 234, phone: "" });
  const { setFieldValue, touched, setFieldTouched, setFieldError } =
    useFormikContext();

  const handleChange = (value, phoneInfo) => {
    if (!touched.phoneNumber) setFieldTouched(name, true);
    const { error, value: newValue } = validatePhoneNumber(value || "");
    setFieldError(name, error);
    setFieldValue(name, newValue, false);
    if (phoneInfo) setPhoneVal(phoneInfo);
  };

  return (
    <Form.Item {...itemProps} name={name} showValidateSuccess>
      <label>{label}</label>
      <ConfigProvider locale={en}>
        <CountryPhoneInput
          onChange={(val) => handleChange(`+${val.code}${val.phone}`, val)}
          value={phoneVal}
          {...rest}
        />
      </ConfigProvider>
    </Form.Item>
  );
};

export default FormPhone;
