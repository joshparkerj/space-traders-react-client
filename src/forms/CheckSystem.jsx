import React from 'react';
import PropTypes from 'prop-types';

const CheckSystem = function CheckSystem({
  value, handleChange, handleSubmit,
}) {
  return (
    <form className="check system" onSubmit={handleSubmit}>
      <h3>check system symbol (two capital letters probably)</h3>
      <input type="text" value={value} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  );
};

CheckSystem.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CheckSystem;
