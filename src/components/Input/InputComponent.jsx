import React from "react";

const InputComponent = ({
  handleChange,
  valid,
  type,
  value,
  onBlur,
  touched,
}) => {
  return (
    <div className="mt-1">
      <input
        id={type}
        type={type}
        autoComplete={type}
        required
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        className={`appearance-none block w-full px-3 py-2 border `}
      />

      {!valid && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
};

export default InputComponent;
