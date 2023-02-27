import { ErrorMessage, Field, useFormikContext } from "formik";

import React from "react";
import { FemaleIcon } from "./icon/FemaleIcon";
import { MaleIcon } from "./icon/MaleIcon";

const getActiveColor = (activeValue, value) =>
  value === activeValue ? "text-[#b7076b]" : "text-[rgba(232,240,254)]";

const genderIcons = {
  male: <MaleIcon className=" w-4 h-9" />,
  female: <FemaleIcon className=" w-4 h-9" />,
};

function GenderControl({ name, options = ["male", "female"] }) {
  const { values } = useFormikContext();

  const safelyGetNestedValues = (nameStr) => {
    const nameArr = nameStr.split(".");

    if (nameArr?.length > 1) {
      return nameArr.reduce((acc, currKey) => {
        return acc[currKey];
      }, values);
    } else {
      return values[name];
    }
  };

  return (
    <div>
      {options?.map((opt) => (
        <Field
          type="radio"
          key={`radio_${opt}`}
          id={opt}
          name={name}
          className="hidden"
          value={opt}
        />
      ))}

      <Field
        type="radio"
        id="female"
        name={name}
        className="hidden"
        value="female"
      />
      <Field
        type="radio"
        id="both"
        name={name}
        className="hidden"
        value="both"
      />
      <div className="flex items-center gap-4">
        {options?.map((opt) => (
          <label
            key={`label_${opt}`}
            htmlFor={opt}
            className={`${getActiveColor(
              opt,
              safelyGetNestedValues(name)
            )} cursor-pointer flex flex-col items-center`}
          >
            {genderIcons[opt]}
            <span className="text-[#3E4954] text-xs capitalize">{opt}</span>
          </label>
        ))}
      </div>
      <span className="text-red-500">
        {/* <ErrorMessage name="gender" /> */}
      </span>
    </div>
  );
}

export default GenderControl;
