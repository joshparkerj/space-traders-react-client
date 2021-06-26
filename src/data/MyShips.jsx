import React from 'react';
import PropTypes from 'prop-types';

import MyShip from './MyShip';
import Data from './Data';

const MyShips = function MyShips({ myShips }) {
  return (
    <Data
      name="my ships"
      fields={['make',
        'model',
        'location',
        'coordinates',
        'class',
        'speed',
        'capacity',
        'cargo',
        'space used',
        'armor',
        'attack',
        'id',
      ]}
      records={myShips.map((e) => ({ ...e, id: e.id }))}
      RowComponent={MyShip}
    />
  );
};

MyShips.propTypes = {
  myShips: PropTypes.arrayOf(PropTypes.object),
};

MyShips.defaultProps = {
  myShips: [],
};

export default MyShips;
