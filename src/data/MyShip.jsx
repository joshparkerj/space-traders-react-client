import React from 'react';
import PropTypes from 'prop-types';
import Datum from './Datum';

const MyShip = function MyShip({ record: myShip }) {
  const fuel = myShip.cargo.find((good) => good.good === 'FUEL')?.totalVolume || 0;
  return (
    <Datum
      name="ship"
      details={[
        myShip.manufacturer,
        myShip.type,
        myShip.location,
        `(${myShip.x}, ${myShip.y})`,
        myShip.speed,
        myShip.maxCargo - fuel,
        fuel,
        myShip.cargo.filter((good) => good.good !== 'FUEL').map((good) => `${good.good} ${good.totalVolume}`).join('\n'),
        myShip.maxCargo - myShip.spaceAvailable - fuel,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

MyShip.propTypes = {
  record: PropTypes.shape({
    class: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    maxCargo: PropTypes.number.isRequired,
    plating: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    weapons: PropTypes.number.isRequired,
    cargo: PropTypes.arrayOf(PropTypes.object).isRequired,
    spaceAvailable: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default MyShip;
