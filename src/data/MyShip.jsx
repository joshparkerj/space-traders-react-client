import React from 'react';
import PropTypes from 'prop-types';
import Datum from './Datum';

const MyShip = function MyShip({ record: myShip }) {
  return (
    <Datum
      name="ship"
      details={[
        myShip.manufacturer,
        myShip.type,
        myShip.location,
        `(${myShip.x}, ${myShip.y})`,
        myShip.class,
        myShip.speed,
        myShip.maxCargo,
        JSON.stringify(myShip.cargo),
        myShip.maxCargo - myShip.spaceAvailable,
        myShip.plating,
        myShip.weapons,
        myShip.id,
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
    cargo: PropTypes.arrayOf(PropTypes.string).isRequired,
    spaceAvailable: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default MyShip;
