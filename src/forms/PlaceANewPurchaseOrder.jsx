import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';
import LabelForNumber from './LabelForNumber';

import api from '../api/api';

import handleChange from './helpers/handle-change';
import handleSubmit from './helpers/handle-submit';

const PlaceANewPurchaseOrder = function PlaceANewPurchaseOrder({
  goods, myShips, setCredits, setMyShips, toast,
}) {
  const [purchaseOrderGoods, setPurchaseOrderGoods] = useState('');
  const [purchaseOrderShips, setPurchaseOrderShips] = useState('');
  const [purchaseOrderQuantity, setPurchaseOrderQuantity] = useState('0');

  return (
    <form
      className="place-a-new-purchase-order"
      onSubmit={handleSubmit(
        api.purchaseOrders.placeANewPurchaseOrder,
        {
          shipId: purchaseOrderShips,
          good: purchaseOrderGoods,
          quantity: purchaseOrderQuantity,
          toastSuccess: true,
          setCredits,
          setMyShips,
        },
        toast,
      )}
    >
      <h3>place a new purchase order</h3>
      <LabelForSelect
        id="purchase-order-good"
        name="good"
        value={purchaseOrderGoods}
        handleChange={handleChange(setPurchaseOrderGoods)}
        options={goods.map((good) => ({ optionName: good.symbol, optionValue: good.symbol }))}
      />
      <LabelForSelect
        id="purchase-order-ship"
        name="ship"
        value={purchaseOrderShips}
        handleChange={handleChange(setPurchaseOrderShips)}
        options={myShips.map((ship) => (
          { optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }
        ))}
      />
      <LabelForNumber
        id="purchase-order-quantity"
        name="quantity"
        value={purchaseOrderQuantity}
        handleChange={handleChange(setPurchaseOrderQuantity)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

PlaceANewPurchaseOrder.propTypes = {
  goods: PropTypes.arrayOf(PropTypes.object),
  myShips: PropTypes.arrayOf(PropTypes.object),
  setCredits: PropTypes.func.isRequired,
  setMyShips: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

PlaceANewPurchaseOrder.defaultProps = {
  goods: [],
  myShips: [],
};

export default PlaceANewPurchaseOrder;
