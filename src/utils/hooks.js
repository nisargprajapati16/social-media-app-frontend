import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) =>
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    values,
    onChange,
    onSubmit,
  };
};
