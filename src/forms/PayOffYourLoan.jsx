import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

const PayOffYourLoan = function PayOffYourLoan({
  loans, value, handleChange, handleSubmit,
}) {
  return (
    <form className="pay-off-your-loan" onSubmit={handleSubmit}>
      <h3>pay off your loan</h3>
      <LabelForSelect
        id="loan-repayment"
        name="loan ids"
        value={value}
        handleChange={handleChange}
        options={loans.map((loan) => loan.id)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

PayOffYourLoan.propTypes = {
  loans: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

PayOffYourLoan.defaultProps = {
  loans: [],
};

export default PayOffYourLoan;
