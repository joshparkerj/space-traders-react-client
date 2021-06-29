import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

import fly from '../auto-trade/fly';
import handleSubmit from './helpers/handle-submit';
import handleChange from './helpers/handle-change';

const CreateFlightPlan = function CreateFlightPlan({
  myShips, locations, setCredits, setMyShips, setMarketLocation, toast,
}) {
  const [flightPlanShip, setFlightPlanShips] = useState('');
  const [flightPlanDestination, setFlightPlanDestination] = useState('');

  return (
    <form
      className="create-flight-plan"
      onSubmit={handleSubmit(
        fly,
        {
          ship: myShips.find((ship) => ship.id === flightPlanShip),
          destination: flightPlanDestination,
          setCredits,
          setMyShips,
          setMarketLocation,
        },
        toast,
      )}
    >
      <h3>create flight plan</h3>
      <LabelForSelect
        id="flight-plan-destination"
        name="destination"
        value={flightPlanDestination}
        handleChange={handleChange(setFlightPlanDestination)}
        options={locations.map((location) => (
          { optionName: `${location.symbol} (${location.name})`, optionValue: location.symbol }
        ))}
      />
      <LabelForSelect
        id="flight-plan-ship"
        name="ship"
        value={flightPlanShip}
        handleChange={handleChange(setFlightPlanShips)}
        options={myShips.map((ship) => (
          { optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }
        ))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

CreateFlightPlan.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  myShips: PropTypes.arrayOf(PropTypes.object),
  setMarketLocation: PropTypes.func.isRequired,
  setCredits: PropTypes.func.isRequired,
  setMyShips: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

CreateFlightPlan.defaultProps = {
  locations: [],
  myShips: [],
};

export default CreateFlightPlan;
