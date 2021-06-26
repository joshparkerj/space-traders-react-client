import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

const Trade = function Trade({
  shipIds,
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
        options={shipIds}
      />

      <LabelForSelect
        id="trade-destination"
        name="destination"
        value={destinationValue}
        handleChange={handleDestinationChange}
        options={locations}
      />

      <LabelForSelect
        id="trade-good"
        name="good"
        value={goodValue}
        handleChange={handleGoodChange}
        options={goods}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

Trade.propTypes = {
  shipIds: PropTypes.arrayOf(PropTypes.string),
  shipValue: PropTypes.string.isRequired,
  handleShipChange: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string),
  destinationValue: PropTypes.string.isRequired,
  handleDestinationChange: PropTypes.func.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string),
  goodValue: PropTypes.string.isRequired,
  handleGoodChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

Trade.defaultProps = {
  shipIds: [],
  locations: [],
  goods: [],
};

export default Trade;
