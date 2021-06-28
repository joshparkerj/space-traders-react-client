import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';

// https://api.spacetraders.io/#api-purchase_orders

const placeANewPurchaseOrder = function placeANewPurchaseOrder(
  {
    shipId, good, quantity, setCredits, setMyShips, toastSuccess,
  }, toast,
) {
  return new Promise((resolve, reject) => {
    fetchPost(`${root}my/purchase-orders?token=${token}&shipId=${shipId}&good=${good}&quantity=${quantity}`)
      .then((json) => {
        setCredits(json.credits);
        setMyShips((s) => [...s.map((ship) => (ship.id === json.ship.id ? json.ship : ship))]);
        if (toastSuccess) {
          const { quantity: orderQuantity, good: orderGood, total } = json.order;
          toast.success(`bought ${orderQuantity} ${orderGood} for ${total}`);
        }

        resolve(json);
      })
      .catch((err) => {
        if (err.message === 'Quantity purchased exceeds ship\'s loading speed.') {
          toast.error(`${err.message}\nMax loading speed is ${err.data.loadingSpeed}`);
        } else {
          toast.error(err.message);
        }

        reject(err);
      });
  });
};

const purchaseOrders = {
  placeANewPurchaseOrder,
};

export default purchaseOrders;
