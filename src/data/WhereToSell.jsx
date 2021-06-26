import React from 'react';
import PropTypes from 'prop-types';

import PlaceToSell from './PlaceToSell';
import Data from './Data';

const WhereToSell = function WhereToSell({ goods }) {
  return (
    <Data
      name="where to sell"
      fields={['symbol', 'size', 'buy', 'sell', 'inventory, location, distance']}
      records={goods.map((good) => ({ ...good, id: good.symbol }))}
      RowComponent={PlaceToSell}
    />
  );
};

WhereToSell.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.object),
};

WhereToSell.defaultProps = {
  goods: [],
};

export default WhereToSell;
