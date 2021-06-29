import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';
import LabelForNumber from './LabelForNumber';

import api from '../api/api';

import handleSubmit from './helpers/handle-submit';
import handleChange from './helpers/handle-change';

const SellTradeGoods = function SellTradeGoods({
  goods, myShips, setCredits, setMyShips, toast,
}) {
  const [sellGood, setSellGood] = useState('');
  const [sellShip, setSellShip] = useState('');
  const [sellQuantity, setSellQuantity] = useState('0');
  return (
    <form
      className="sell-trade-goods"
      onSubmit={handleSubmit(
        api.sellOrders.sellTradeGoods,
        {
          shipId: sellShip,
          good: sellGood,
          quantity: sellQuantity,
          toastSuccess: true,
          setCredits,
          setMyShips,
        },
        toast,
      )}
    >
      <h3>sell trade goods</h3>
      <LabelForSelect
        id="sell-good"
        name="good"
        value={sellGood}
        handleChange={handleChange(setSellGood)}
        options={goods.map((good) => ({ optionName: good.symbol, optionValue: good.symbol }))}
      />
      <LabelForSelect
        id="sell-ship"
        name="ship"
        value={sellShip}
        handleChange={handleChange(setSellShip)}
        options={myShips.map((ship) => (
          { optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }
        ))}
      />
      <LabelForNumber
        id="sell-quantity"
        name="quantity"
        value={sellQuantity}
        handleChange={handleChange(setSellQuantity)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

SellTradeGoods.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.object),
  myShips: PropTypes.arrayOf(PropTypes.object),
  setCredits: PropTypes.func.isRequired,
  setMyShips: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

SellTradeGoods.defaultProps = {
  goods: [],
  myShips: [],
};

export default SellTradeGoods;
