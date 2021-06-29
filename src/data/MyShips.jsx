import React from 'react';
import PropTypes from 'prop-types';

import MyShip from './MyShip';
import Data from './Data';

import getFuel from './helpers/get-fuel';
import getCargo from './helpers/get-cargo';

const MyShips = function MyShips({ myShips }) {
  return (
    <Data
      name="my ships"
      fields={[['make', 'manufacturer'],
        ['model', 'type'],
        ['location', 'location'],
        ['coordinates', (ship) => `(${ship.x}, ${ship.y})`],
        ['speed', 'speed'],
        ['capacity', (ship) => ship.maxCargo - getFuel(ship)],
        ['fuel', getFuel],
        ['cargo', getCargo],
        ['space used', (ship) => ship.maxCargo - ship.spaceAvailable - getFuel(ship)],
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
