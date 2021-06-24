import React from 'react';
import PropTypes from 'prop-types';
import Datum from './Datum';

const Ship = function Ship({ record: ship }) {
  return (
    <Datum
      name="ship"
      details={[
        ship.manufacturer,
        ship.type,
        ship.location,
        ship.class,
        ship.speed,
        ship.maxCargo,
        ship.plating,
        ship.weapons,
        ship.price,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

Ship.propTypes = {
  record: PropTypes.shape({
    class: PropTypes.string.isRequired,
    manufacturer: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    maxCargo: PropTypes.number.isRequired,
    plating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    weapons: PropTypes.number.isRequired,
  }).isRequired,
};

export default Ship;
