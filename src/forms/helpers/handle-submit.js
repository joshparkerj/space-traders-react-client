const handleSubmit = function handleSubmit(apiFunc, data, toast) {
  return function submitHandler(event) {
    apiFunc(data, toast);
    event.preventDefault();
  };
};

export default handleSubmit;
