import React from 'react';
import PropTypes from 'prop-types';

import Datum from './Datum';

const Good = function Good({ record: good }) {
  return (
    <Datum
      name="loan type"
      details={[
        good.name,
        good.symbol,
        good.volumePerUnit,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

Good.propTypes = {
  record: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    volumePerUnit: PropTypes.number.isRequired,
  }).isRequired,
};

export default Good;
