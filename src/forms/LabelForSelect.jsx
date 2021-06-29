import React from 'react';
import PropTypes from 'prop-types';

const LabelForSelect = function LabelForSelect({
  id, name, value, handleChange, options,
}) {
  return (
    <label htmlFor={id}>
      <h4>{name}</h4>
      <select {...{ id, value }} onChange={handleChange}>
        {['', ...options].map(({ optionName, optionValue }) => (
          <option key={optionValue || ''} value={optionValue || ''}>{optionName || ''}</option>
        ))}
      </select>
    </label>
  );
};

LabelForSelect.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LabelForSelect;
