import React from 'react';
import PropTypes from 'prop-types';

import Loan from './Loan';

const Loans = function Loans({ loans }) {
  return (
    <table className="loans">
      <caption>loans</caption>
      <thead>
        <tr>
          <th>name</th>
          <th>term</th>
          <th>rate</th>
          <th>collateral required?</th>
          <th>amount</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => <Loan key={loan.type} loan={loan} />)}
      </tbody>
    </table>
  );
};

Loans.propTypes = {
  loans: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Loans;
