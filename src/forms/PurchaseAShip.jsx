import React from 'react';
import PropTypes from 'prop-types';

const PurchaseAShip = function PurchaseAShip({
  ships, value, handleChange, handleSubmit,
}) {
  const names = ships.map((e) => `${e.location} ${e.type}`);

  return (
    <form className="purchase-a-ship" onSubmit={handleSubmit}>
      <h3>purchase-a-ship</h3>
      <select {...{ value }} onChange={handleChange}>
        {['', ...names].map((ship) => <option key={ship} value={ship}>{ship}</option>)}
      </select>

      <input type="submit" value="Submit" />
    </form>
  );
};

PurchaseAShip.propTypes = {
  ships: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

PurchaseAShip.defaultProps = {
  ships: [],
};

export default PurchaseAShip;
