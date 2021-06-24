import React from 'react';
import PropTypes from 'prop-types';

import Loan from './Loan';
import Data from './Data';

const Loans = function Loans({ loans }) {
  return (
    <Data
      name="loans"
      fields={['type', 'status', 'amount', 'due date', 'id']}
      records={loans}
      RowComponent={Loan}
    />
  );
};

Loans.propTypes = {
  loans: PropTypes.arrayOf(PropTypes.object),
};

Loans.defaultProps = {
  loans: [],
};

export default Loans;
