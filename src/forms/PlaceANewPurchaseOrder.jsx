import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';
import LabelForNumber from './LabelForNumber';

const PlaceANewPurchaseOrder = function PlaceANewPurchaseOrder({
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
    <form className="place-a-new-purchase-order" onSubmit={handleSubmit}>
      <h3>place a new purchase order</h3>
      <LabelForSelect
        id="purchase-order-good"
        name="good"
        value={goodsValue}
        handleChange={handleGoodsChange}
        options={goods.map((good) => ({ optionName: good.symbol, optionValue: good.symbol }))}
      />
      <LabelForSelect
        id="purchase-order-ship"
        name="ship"
        value={shipsValue}
        handleChange={handleShipChange}
        options={ships.map((ship) => ({ optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }))}
      />
      <LabelForNumber
        id="purchase-order-quantity"
        name="quantity"
        value={quantityValue}
        handleChange={handleQuantityChange}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

PlaceANewPurchaseOrder.propTypes = {
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

PlaceANewPurchaseOrder.defaultProps = {
  goods: [],
  ships: [],
};

export default PlaceANewPurchaseOrder;
