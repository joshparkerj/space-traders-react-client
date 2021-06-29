import React from 'react';
import PropTypes from 'prop-types';

const LabelForNumber = function LabelForNumber({
  id, name, value, handleChange,
}) {
  return (
    <label htmlFor={id}>
      <h4>{name}</h4>
      <input type="number" {...{ id, value }} onChange={handleChange} />
    </label>
  );
};

LabelForNumber.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default LabelForNumber;
