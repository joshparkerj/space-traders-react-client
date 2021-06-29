import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

import staticRoute from '../auto-trade/static-route';
import handleSubmit from './helpers/handle-submit';
import handleChange from './helpers/handle-change';

const AutoRunStaticRoute = function AutoRunStaticRoute({
  myShips, setCredits, setMyShips, setMarketLocation, toast,
}) {
  const [staticRouteName, setStaticRouteName] = useState('');
  const [staticRouteShip, setStaticRouteShip] = useState('');

  return (
    <form
      className="auto-run-static-route"
      onSubmit={handleSubmit(
        staticRoute,
        {
          ship: myShips.find((ship) => ship.id === staticRouteShip),
          name: staticRouteName,
          setCredits,
          setMyShips,
          setMarketLocation,
        },
        toast,
      )}
    >
      <h3>auto run static route</h3>
      <LabelForSelect
        id="static-route-name"
        name="Static Route Name"
        value={staticRouteName}
        handleChange={handleChange(setStaticRouteName)}
        options={[
          { optionName: 'Omicron Eridani', optionValue: 'Omicron Eridani' },
          { optionName: 'Xiav', optionValue: 'Xiav' },
        ]}
      />
      <LabelForSelect
        {...{ value: staticRouteShip, handleChange }}
        value={staticRouteShip}
        handleChange={handleChange(setStaticRouteShip)}
        id="static-route-ship-id"
        name="ship id"
        options={myShips.map((ship) => (
          { optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }
        ))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

AutoRunStaticRoute.propTypes = {
  myShips: PropTypes.arrayOf(PropTypes.object),
  setMarketLocation: PropTypes.func.isRequired,
  setCredits: PropTypes.func.isRequired,
  setMyShips: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

AutoRunStaticRoute.defaultProps = {
  myShips: [],
};

export default AutoRunStaticRoute;
