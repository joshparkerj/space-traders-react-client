import React from 'react';
import PropTypes from 'prop-types';
import Datum from './Datum';

const Location = function Location({ record: location }) {
  return (
    <Datum
      name="ship"
      details={[
        location.name,
        location.type,
        `(${location.x},${location.y})`,
        location.symbol,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

Location.propTypes = {
  record: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Location;
