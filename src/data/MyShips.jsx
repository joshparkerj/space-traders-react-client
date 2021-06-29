import React from 'react';
import PropTypes from 'prop-types';

import MyShip from './MyShip';
import Data from './Data';

const MyShips = function MyShips({ myShips }) {
  const getFuel = (ship) => ship.cargo.find((good) => good.good === 'FUEL')?.totalVolume || 0;
  const getCargo = (ship) => ship.cargo.filter((good) => good.good !== 'FUEL').map((good) => `${good.good} ${good.totalVolume}`).join('\n');
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
