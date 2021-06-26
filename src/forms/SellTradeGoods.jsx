import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';
import LabelForNumber from './LabelForNumber';

const SellTradeGoods = function SellTradeGoods({
  goods,
  ships,
  goodsValue,
  shipsValue,
  quantityValue,
  handleGoodsChange,
  handleShipChange,
  handleQuantityChange,
  handleSubmit,
}) {
  return (
    <form className="sell-trade-goods" onSubmit={handleSubmit}>
      <h3>sell trade goods</h3>
      <LabelForSelect
        id="sell-good"
        name="good"
        value={goodsValue}
        handleChange={handleGoodsChange}
        options={goods.map((good) => good.symbol)}
      />
      <LabelForSelect
        id="sell-ship"
        name="ship"
        value={shipsValue}
        handleChange={handleShipChange}
        options={ships.map((ship) => ship.id)}
      />
      <LabelForNumber
        id="sell-quantity"
        name="quantity"
        value={quantityValue}
        handleChange={handleQuantityChange}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

SellTradeGoods.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.object),
  ships: PropTypes.arrayOf(PropTypes.object),
  goodsValue: PropTypes.string.isRequired,
  handleGoodsChange: PropTypes.func.isRequired,
  shipsValue: PropTypes.string.isRequired,
  handleShipChange: PropTypes.func.isRequired,
  quantityValue: PropTypes.string.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

SellTradeGoods.defaultProps = {
  goods: [],
  ships: [],
};

export default SellTradeGoods;
