const handleChange = function handleChange(setter) {
  return function changeHandler({ target }) {
    setter(target.value);
  };
};

export default handleChange;
