import React from 'react';
import PropTypes from 'prop-types';

import Datum from './Datum';

const MarketGood = function MarketGood({ record: good }) {
  return (
    <Datum
      name="loan type"
      details={[
        good.symbol,
        good.volumePerUnit,
        good.purchasePricePerUnit,
        good.sellPricePerUnit,
        good.quantityAvailable,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

MarketGood.propTypes = {
  record: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    volumePerUnit: PropTypes.number.isRequired,
    purchasePricePerUnit: PropTypes.number.isRequired,
    sellPricePerUnit: PropTypes.number.isRequired,
    quantityAvailable: PropTypes.number.isRequired,
  }).isRequired,
};

export default MarketGood;
