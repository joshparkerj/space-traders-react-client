import React from 'react';
import PropTypes from 'prop-types';

import Datum from './Datum';

const LoanType = function LoanType({ record: loan }) {
  return (
    <Datum
      name="loan type"
      details={[
        loan.type,
        loan.termInDays,
        loan.rate,
        loan.collateralRequired,
        loan.amount,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

LoanType.propTypes = {
  record: PropTypes.shape({
    type: PropTypes.string.isRequired,
    termInDays: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    collateralRequired: PropTypes.bool.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default LoanType;
