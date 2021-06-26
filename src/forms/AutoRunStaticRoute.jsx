import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

const AutoRunStaticRoute = function AutoRunStaticRoute({
  ships, value, handleChange, handleSubmit,
}) {
  return (
    <form className="auto-run-static-route" onSubmit={handleSubmit}>
      <h3>auto run static route</h3>
      <LabelForSelect
        id="static-route-ship-id"
        name="ship id"
        value={value}
        handleChange={handleChange}
        options={ships.map((ship) => ({ optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

AutoRunStaticRoute.propTypes = {
  ships: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AutoRunStaticRoute.defaultProps = {
  ships: [],
};

export default AutoRunStaticRoute;
