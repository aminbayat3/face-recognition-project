import { useState } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};

export const useFormFieldsUpdate = (name) => {
  name && (defaultFormFields[name] = "");
  const [formFields, setFormFields] = useState(defaultFormFields);

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return {onHandleChange, formFields};
};
