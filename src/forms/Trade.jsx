import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

const Trade = function Trade({
  ships,
  shipValue,
  handleShipChange,
  locations,
  destinationValue,
  handleDestinationChange,
  goods,
  goodValue,
  handleGoodChange,
  handleSubmit,
}) {
  return (
    <form className="trade" onSubmit={handleSubmit}>
      <h3>trade</h3>
      <LabelForSelect
        id="trade-ship-id"
        name="ship id"
        value={shipValue}
        handleChange={handleShipChange}
        options={ships.map((ship) => ({ optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }))}
      />

      <LabelForSelect
        id="trade-destination"
        name="destination"
        value={destinationValue}
        handleChange={handleDestinationChange}
        options={locations.map((location) => ({ optionName: `${location.symbol} (${location.name})`, optionValue: location.symbol }))}
      />

      <LabelForSelect
        id="trade-good"
        name="good"
        value={goodValue}
        handleChange={handleGoodChange}
        options={goods.map((good) => ({ optionName: good.symbol, optionValue: good.symbol }))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

Trade.propTypes = {
  ships: PropTypes.arrayOf(PropTypes.object),
  shipValue: PropTypes.string.isRequired,
  handleShipChange: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object),
  destinationValue: PropTypes.string.isRequired,
  handleDestinationChange: PropTypes.func.isRequired,
  goods: PropTypes.arrayOf(PropTypes.object),
  goodValue: PropTypes.string.isRequired,
  handleGoodChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

Trade.defaultProps = {
  ships: [],
  locations: [],
  goods: [],
};

export default Trade;
