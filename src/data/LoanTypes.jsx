import React from 'react';
import PropTypes from 'prop-types';

import LoanType from './LoanType';
import Data from './Data';

const LoanTypes = function LoanTypes({ loans }) {
  return (
    <Data name="loan types" fields={['name', 'term', 'rate', 'collateral required?', 'amount']} records={loans.map((loan) => ({ ...loan, id: loan.type }))} RowComponent={LoanType} />
  );
};

LoanTypes.propTypes = {
  loans: PropTypes.arrayOf(PropTypes.object),
};

LoanTypes.defaultProps = {
  loans: [],
};

export default LoanTypes;
