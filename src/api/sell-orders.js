import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';

// https://api.spacetraders.io/#api-sell_orders

const sellTradeGoods = function sellTradeGoods({
  shipId, good, quantity, setCredits, setMyShips, toastSuccess,
}, toast) {
  return new Promise((resolve) => {
    fetchPost(`${root}my/sell-orders`
      + `?token=${token}&shipId=${shipId}&good=${good}&quantity=${quantity}`)
      .then((json) => {
        if (toastSuccess) {
          const { good: orderGood, total, quantity: orderQuantity } = json.order;
          setCredits(json.credits);
          setMyShips((s) => [...s.map((ship) => (ship.id === json.ship.id ? json.ship : ship))]);
          toast.success(`sold ${orderQuantity} ${orderGood} for ${total}`);
        }

        resolve(json);
      })
      .catch((err) => {
        if (err.message === 'Quantity purchased exceeds ship\'s loading speed.') {
          toast.error(`${err.message}\nMax loading speed is ${err.data.loadingSpeed}`);
        } else if (err.message) {
          toast.error(err.message);
        } else {
          toast.error(err);
        }
      });
  });
};

const sellOrders = {
  sellTradeGoods,
};

export default sellOrders;
