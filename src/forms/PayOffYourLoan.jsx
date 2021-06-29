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
        {...{ value, handleChange }}
        id="loan-repayment"
        name="loan ids"
        options={loans.map((loan) => (
          { optionName: `${loan.status} ${loan.type} loan`, optionValue: loan.id }
        ))}
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
