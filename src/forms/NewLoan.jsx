import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

import api from '../api/api';

import handleChange from './helpers/handle-change';
import handleSubmit from './helpers/handle-submit';

const NewLoan = function NewLoan({
  loanTypes, setLoans, setCredits, toast,
}) {
  const [takeOutALoan, setTakeOutALoan] = useState('');

  return (
    <form
      className="take-out-a-loan"
      onSubmit={handleSubmit(
        api.loans.takeOutALoan,
        { type: takeOutALoan, setLoans, setCredits },
        toast,
      )}
    >
      <h3>take out a loan</h3>
      <LabelForSelect
        value={takeOutALoan}
        handleChange={handleChange(setTakeOutALoan)}
        id="loan-form-types"
        name="loan types"
        options={loanTypes.map((lt) => ({ optionName: lt, optionValue: lt }))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

NewLoan.propTypes = {
  loanTypes: PropTypes.arrayOf(PropTypes.string),
  setLoans: PropTypes.func.isRequired,
  setCredits: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

NewLoan.defaultProps = {
  loanTypes: [],
};

export default NewLoan;
