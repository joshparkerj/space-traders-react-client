import React from 'react';
import PropTypes from 'prop-types';

import MarketGood from './MarketGood';
import Data from './Data';

const Market = function Market({ goods }) {
  return (
    <Data
      name="market place"
      fields={['symbol', 'size', 'buy', 'sell', 'inventory']}
      records={goods.map((good) => ({ ...good, id: good.symbol }))}
      RowComponent={MarketGood}
    />
  );
};

Market.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.object),
};

Market.defaultProps = {
  goods: [],
};

export default Market;
