import api from '../api/api';
import fly from './fly';

const trade = function trade({
  ship,
  good,
  size,
  destination,
  setCredits,
  setMyShips,
  setMarketLocation,
}, toast) {
  return new Promise((resolve) => {
    let net = 0;
    const startTime = Date.now();
    const spaceAvailable = ship.maxCargo - 20;
    const { loadingSpeed } = ship;
    const units = spaceAvailable / size;
    const loads = [];
    for (let count = 0; count <= units; count += loadingSpeed) {
      loads.push(units - count >= loadingSpeed ? loadingSpeed : units - count);
    }

    Promise.all(loads.map((load) => (
      api.purchaseOrders.placeANewPurchaseOrder({
        shipId: ship.id, good, quantity: load, setCredits, setMyShips,
      }, toast).then((json) => {
        net -= json.order.total;
        return json;
      })
    )))
      .then(() => fly({
        ship, destination, setCredits, setMyShips, setMarketLocation,
      }, toast))
      .then((json) => {
        net -= json.fuelExpenditure;
        return Promise.all(loads.map((load) => (
          api.sellOrders.sellTradeGoods({ shipId: ship.id, good, quantity: load }, toast)
            .then(((j) => {
              net += j.order.total;
            }))
        )));
      })
      .then(() => {
        const time = Date.now() - startTime;
        toast.info(`trade profit ${60000 * (net / time)} per minute`);
        resolve({ net, time });
      });
  });
};

export default trade;
