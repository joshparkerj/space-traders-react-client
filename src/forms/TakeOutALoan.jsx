import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

const TakeOutALoan = function TakeOutALoan({
  loanTypes, value, handleChange, handleSubmit,
}) {
  return (
    <form className="take-out-a-loan" onSubmit={handleSubmit}>
      <h3>take out a loan</h3>
      <LabelForSelect
        id="loan-form-types"
        name="loan types"
        value={value}
        handleChange={handleChange}
        options={loanTypes}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

TakeOutALoan.propTypes = {
  loanTypes: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

TakeOutALoan.defaultProps = {
  loanTypes: [],
};

export default TakeOutALoan;
