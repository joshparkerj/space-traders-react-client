import api from '../api/api';
import chainPromises from '../util/chain-promises';
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

    chainPromises(loads.map((load) => () => (
      api.purchaseOrders.placeANewPurchaseOrder({
        shipId: ship.id, good, quantity: load, setCredits, setMyShips,
      }, toast).then(({ order }) => {
        net -= order.total;
      })
    )))
      .then(() => fly({
        ship, destination, setCredits, setMyShips, setMarketLocation,
      }, toast))
      .then((json) => {
        net -= json.fuelExpenditure;
        return chainPromises(loads.map((load) => () => (
          api.sellOrders.sellTradeGoods({
            shipId: ship.id, good, quantity: load, setCredits, setMyShips,
          }, toast)
            .then(({ order }) => {
              net += order.total;
            }))));
      })
      .then(() => {
        const time = Date.now() - startTime;
        toast.info(`trade profit ${Math.round(1000 * (net / time))} per second`);
        resolve({ net, time });
      });
  });
};

export default trade;
