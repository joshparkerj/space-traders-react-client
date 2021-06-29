import React, { useState } from 'react';
import PropTypes from 'prop-types';

import api from '../api/api';

import handleChange from './helpers/handle-change';
import handleSubmit from './helpers/handle-submit';

const PurchaseAShip = function PurchaseAShip({
  ships, setMyShips, setCredits, toast,
}) {
  const [purchaseAShip, setPurchaseAShip] = useState('');
  const names = ships.map((e) => `${e.location} ${e.type}`);

  return (
    <form
      className="purchase-a-ship"
      onSubmit={handleSubmit(
        api.ships.purchaseAShip,
        {
          location: purchaseAShip ? purchaseAShip.split(' ')[0] : '',
          type: purchaseAShip ? purchaseAShip.split(' ')[1] : '',
          setMyShips,
          setCredits,
        },
        toast,
      )}
    >
      <h3>purchase-a-ship</h3>
      <select {...{ value: purchaseAShip }} onChange={handleChange(setPurchaseAShip)}>
        {['', ...names].map((ship) => <option key={ship} value={ship}>{ship}</option>)}
      </select>

      <input type="submit" value="Submit" />
    </form>
  );
};

PurchaseAShip.propTypes = {
  ships: PropTypes.arrayOf(PropTypes.object),
  setCredits: PropTypes.func.isRequired,
  setMyShips: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

PurchaseAShip.defaultProps = {
  ships: [],
};

export default PurchaseAShip;
