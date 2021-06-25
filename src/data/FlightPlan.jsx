import React from 'react';
import PropTypes from 'prop-types';

import Datum from './Datum';

const FlightPlan = function FlightPlan({ record: flightPlan }) {
  return (
    <Datum
      name="flight plan"
      details={[
        flightPlan.departure,
        flightPlan.createdAt,
        flightPlan.destination,
        flightPlan.arrivesAt,
        flightPlan.shipType,
        flightPlan.shipId,
        flightPlan.id,
        flightPlan.username,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

FlightPlan.propTypes = {
  record: PropTypes.shape({
    departure: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    arrivesAt: PropTypes.string.isRequired,
    shipType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    shipId: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default FlightPlan;
