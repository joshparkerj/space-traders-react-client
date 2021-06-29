import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

import api from '../api/api';
import handleChange from './helpers/handle-change';
import handleSubmit from './helpers/handle-submit';

const PayOffYourLoan = function PayOffYourLoan({ loans, toast }) {
  const [repayLoan, setRepayLoan] = useState('');

  return (
    <form
      className="pay-off-your-loan"
      onSubmit={handleSubmit(
        api.loans.payOffYourLoan,
        {
          loan: loans.find((loan) => loan.id === repayLoan),
        },
        toast,
      )}
    >
      <h3>pay off your loan</h3>
      <LabelForSelect
        {...{ value: repayLoan, handleChange }}
        value={repayLoan}
        handleChange={handleChange(setRepayLoan)}
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
  toast: PropTypes.func.isRequired,
};

PayOffYourLoan.defaultProps = {
  loans: [],
};

export default PayOffYourLoan;
