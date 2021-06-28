import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

const AutoRunStaticRoute = function AutoRunStaticRoute({
  ships, value, handleChange, nameValue, handleNameChange, handleSubmit,
}) {
  return (
    <form className="auto-run-static-route" onSubmit={handleSubmit}>
      <h3>auto run static route</h3>
      <LabelForSelect
        id="static-route-name"
        name="Static Route Name"
        value={nameValue}
        handleChange={handleNameChange}
        options={[{ optionName: 'Omicron Eridani', optionValue: 'Omicron Eridani' }, { optionName: 'Xiav', optionValue: 'Xiav' }]}
      />
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
  nameValue: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AutoRunStaticRoute.defaultProps = {
  ships: [],
};

export default AutoRunStaticRoute;
