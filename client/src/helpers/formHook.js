import { useState } from 'react';

export const useForm = (initialState = {}, validations = []) => {
  const { isValid: initialIsValid, errors: initialErrors } = validate(
    validations,
    initialState
  );
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setValid] = useState(initialIsValid);
  const [touched, setTouched] = useState({});
  const changeHandler = (event) => {
    const newValues = { ...values, [event.target.name]: event.target.value };
    const { isValid, errors } = validate(validations, newValues);
    setValues(newValues);
    setValid(isValid);
    setErrors(errors);
    setTouched({ ...touched, [event.target.name]: true });
  };
  return { values, changeHandler, isValid, errors, touched };
};

function validate(validations, values) {
  const errors = validations
    .map((validation) => validation(values))
    .filter((validation) => typeof validation === 'object');
  return {
    isValid: errors.length === 0,
    errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}),
  };
}

export const isRequired = (value) => {
  return value != null && value.trim().length > 0;
};

export const isSame = (value1, value2) => {
  return value1 === value2;
};
