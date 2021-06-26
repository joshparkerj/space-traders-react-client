import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

const CreateFlightPlan = function CreateFlightPlan({
  ships,
  shipsValue,
  locations,
  destinationValue,
  handleShipChange,
  handleDestinationChange,
  handleSubmit,
}) {
  return (
    <form className="create-flight-plan" onSubmit={handleSubmit}>
      <h3>create flight plan</h3>
      <LabelForSelect
        id="flight-plan-destination"
        name="destination"
        value={destinationValue}
        handleChange={handleDestinationChange}
        options={locations.map((location) => ({ optionName: `${location.symbol} (${location.name})`, optionValue: location.symbol }))}
      />
      <LabelForSelect
        id="flight-plan-ship"
        name="ship"
        value={shipsValue}
        handleChange={handleShipChange}
        options={ships.map((ship) => ({ optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

CreateFlightPlan.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  ships: PropTypes.arrayOf(PropTypes.object),
  destinationValue: PropTypes.string.isRequired,
  handleDestinationChange: PropTypes.func.isRequired,
  shipsValue: PropTypes.string.isRequired,
  handleShipChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

CreateFlightPlan.defaultProps = {
  locations: [],
  ships: [],
};

export default CreateFlightPlan;
