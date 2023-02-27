export const validateEmail = (value) => {
  let errors;

  if (!value) {
    errors = "Required!";
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    errors = "Invalid email address!";
  }

  return errors;
};

export const validateName = (value) => {
  let errors;

  if (!value) {
    errors = "Required!";
  }

  return errors;
};

export const validatPassword = (value) => {
  let errors;

  if (!value) {
    errors = "Required!";
  }

  // else if (/^ (?=.*\d) (?=.* [a - z])(?=.* [A - Z])(?=.* [a - zA - Z]).{ 8,}$/gm) {
  //     errors = "Invalid Password \n Password must contain 8 character, a capitl letter, special character and number"
  // }

  return errors;
};

export const validatTextarea = (value) => {
  let errors;

  if (!value) {
    errors = "Required!";
  }

  return errors;
};

export const isRequired = (value) => (!value ? "Required!" : "");
