import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(en);

import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const getCountryCallingCode = (countryCode) => {
  const phoneNumber = parsePhoneNumberFromString('', countryCode);
  if (phoneNumber) {
    return `+${phoneNumber.countryCallingCode}`;
  } else {
    return null;
  }
};

export const getCountryOptions = () => {
  const allCountries = countries.getNames('en');
  const countryOptions = Object.keys(allCountries).map((key) => ({
    label: `${allCountries[key]} (+${getCountryCallingCode(key)})`,
    value: countries.getAlpha2yyCode(allCountries[key], 'en'),
  }));
  console.log(countryOptions)
  return countryOptions;
};
