import React from 'react';
import PropTypes from 'prop-types';

const Loan = function Loan({ loan }) {
  return (
    <tr className="loan">
      <td>{loan.type}</td>
      <td>{loan.termInDays}</td>
      <td>{loan.rate}</td>
      <td>{loan.collateralRequired}</td>
      <td>{loan.amount}</td>
    </tr>
  );
};

Loan.propTypes = {
  loan: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    collateralRequired: PropTypes.bool.isRequired,
    rate: PropTypes.number.isRequired,
    termInDays: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Loan;
