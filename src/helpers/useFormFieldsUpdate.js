import { useState } from "react";

export const useFormFieldsUpdate = (defaultFormFields) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return [ onHandleChange, formFields ];
};


// look up "react-use" NPM package