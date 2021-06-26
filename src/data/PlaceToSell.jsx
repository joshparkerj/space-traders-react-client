import React from 'react';
import PropTypes from 'prop-types';

import Datum from './Datum';

const PlaceToSell = function PlaceToSell({ record: good }) {
  return (
    <Datum
      name="place to sell"
      details={[
        good.symbol,
        good.volumePerUnit,
        good.purchasePricePerUnit,
        good.sellPricePerUnit,
        good.quantityAvailable,
        good.location,
        good.distance,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

PlaceToSell.propTypes = {
  record: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    volumePerUnit: PropTypes.number.isRequired,
    purchasePricePerUnit: PropTypes.number.isRequired,
    sellPricePerUnit: PropTypes.number.isRequired,
    quantityAvailable: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlaceToSell;
