import React from 'react';
import PropTypes from 'prop-types';
import Datum from './Datum';

const Loan = function Loan({ record: loan }) {
  return (
    <Datum
      name="user"
      details={[
        loan.type,
        loan.status,
        loan.repaymentAmount,
        loan.due,
        loan.id,
      ].map((e, i) => ({ id: i, detail: e }))}
    />
  );
};

Loan.propTypes = {
  record: PropTypes.shape({
    due: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    repaymentAmount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Loan;
