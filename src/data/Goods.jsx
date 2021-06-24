import React from 'react';
import PropTypes from 'prop-types';

import Good from './Good';
import Data from './Data';

const Goods = function Goods({ goods }) {
  return (
    <Data
      name="goods"
      fields={['name', 'symbol', 'size']}
      records={goods.map((good) => ({ ...good, id: good.symbol }))}
      RowComponent={Good}
    />
  );
};

Goods.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.object),
};

Goods.defaultProps = {
  goods: [],
};

export default Goods;
