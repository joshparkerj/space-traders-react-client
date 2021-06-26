import api from '../api/api';
import fly from './fly';

const trade = function trade({
  shipId, good, destination, setCredits, setMyShips,
}, toast) {
  return new Promise((resolve) => {
    // buy good
    let net = 0;
    let time;
    api.placeANewPurchaseOrder({
      shipId, good, quantity: 25, setCredits, setMyShips,
    }, toast)
      .then((json) => {
        net -= json.order.total;
        return api.placeANewPurchaseOrder({
          shipId, good, quantity: 5, setCredits, setMyShips,
        }, toast);
      })
      // fly to destination
      .then((json) => {
        net -= json.order.total;
        return fly({
          shipId, destination, setCredits, setMyShips,
        }, toast);
      })
      // sell good
      .then((json) => {
        net -= json.fuelExpenditure;
        time = json.flightPlan.timeRemainingInSeconds;
        return api.sellTradeGoods({ shipId, good, quantity: 25 }, toast);
      })
      .then((json) => {
        net += json.order.total;
        return api.sellTradeGoods({ shipId, good, quantity: 5 }, toast);
      })
      .then((json) => {
        net += json.order.total;
        toast.info(`trade profit ${60 * (net / time)} per minute`);
        resolve({ ...json, net, time });
      });
  });
};

export default trade;
