import React from 'react';
import PropTypes from 'prop-types';

import Ship from './Ship';
import Data from './Data';

const Ships = function Ships({ ships }) {
  return (
    <Data
      name="ships"
      fields={[
        'make',
        'model',
        'location',
        'class',
        'speed',
        'capacity',
        'armor',
        'attack',
        'price',
      ]}
      records={ships.map((e) => ({ ...e, id: e.type + e.location }))}
      RowComponent={Ship}
    />
  );
};

Ships.propTypes = {
  ships: PropTypes.arrayOf(PropTypes.object),
};

Ships.defaultProps = {
  ships: [],
};

export default Ships;
