import api from '../api/api';
import fly from './fly';

const trade = function trade({
  shipId,
  good,
  size,
  spaceAvailable,
  loadingSpeed,
  destination,
  setCredits,
  setMyShips,
  setMarketLocation,
}, toast) {
  return new Promise((resolve) => {
    let net = 0;
    let time;
    const units = spaceAvailable / size;
    const loads = [];
    for (let count = 0; count <= units; count += loadingSpeed) {
      loads.push(units - count >= loadingSpeed ? loadingSpeed : units - count);
    }

    console.log(loads);
    Promise.all(loads.map((load) => (
      api.purchaseOrders.placeANewPurchaseOrder({
        shipId, good, quantity: load, setCredits, setMyShips,
      }, toast).then((json) => {
        net -= json.order.total;
        return json;
      })
    )))
      .then(() => fly({
        shipId, destination, setCredits, setMyShips, setMarketLocation,
      }, toast))
      .then((json) => {
        net -= json.fuelExpenditure;
        time = json.flightPlan.timeRemainingInSeconds;
        return api.sellOrders.sellTradeGoods({ shipId, good, quantity: 25 }, toast);
      })
      .then((json) => {
        net += json.order.total;
        return api.sellOrders.sellTradeGoods({ shipId, good, quantity: 5 }, toast);
      })
      .then((json) => {
        net += json.order.total;
        toast.info(`trade profit ${60 * (net / time)} per minute`);
        resolve({ ...json, net, time });
      });
  });
};

export default trade;
