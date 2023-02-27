import {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
export function validatePhoneNumber(value) {
  const copyVal = value;
  value = value ? formatPhoneNumberIntl(value) : "";
  value = value?.replace(/\s+/g, "");
  value = value || copyVal; //prevent return empty string due to invalid format
  let error = !!value ? undefined : "must be a valid number";
  if (value && !isValidPhoneNumber(value)) error = "invalid Phone number";
  return { error, value };
}
