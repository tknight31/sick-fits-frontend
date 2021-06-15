import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs

  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    setInputs({
      // copy the existing state
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  // return what we want to surface
  return {
    inputs,
    handleChange,
  };
}
