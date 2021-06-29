import React from 'react';
import PropTypes from 'prop-types';

import FlightPlan from './FlightPlan';
import Data from './Data';

const FlightPlans = function FlightPlans({ flightPlans }) {
  return (
    <Data
      name="flight plans"
      fields={[
        'departed from',
        'departure time',
        'headed to',
        'estimated time of arrival',
        'ship type',
        'ship id',
        'flight plan id',
        'owner',
      ]}
      records={flightPlans.map((flightPlan) => ({ ...flightPlan, id: flightPlan.id }))}
      RowComponent={FlightPlan}
    />
  );
};

FlightPlans.propTypes = {
  flightPlans: PropTypes.arrayOf(PropTypes.object),
};

FlightPlans.defaultProps = {
  flightPlans: [],
};

export default FlightPlans;
