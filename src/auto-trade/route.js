import trade from './trade';
import api from '../api/api';

const route = function route({
  shipId, nodes, setCredits, setMyShips, setMarketLocation,
}, toast, nextNode) {
  let i;
  if (nextNode === undefined) {
    let cargo;
    api.ships.getMyShip(shipId)
      .then(({ ship }) => {
        i = 1 + nodes.findIndex((node) => node[0] === ship.location);
        i %= nodes.length;
        const fuelLevel = ship.cargo.find((good) => good.good === 'FUEL').quantity;
        cargo = ship.cargo.filter((good) => good.good !== 'FUEL').reduce((acc, e) => {
          const loads = [];
          for (let count = 0; count <= e.quantity; count += 25) {
            loads.push({ ...e, quantity: e.quantity - count >= 25 ? 25 : e.quantity - count });
          }

          return acc.concat(loads);
        }, []);

        if (fuelLevel < 20) {
          return api.purchaseOrders.placeANewPurchaseOrder({
            shipId, good: 'FUEL', quantity: 20 - fuelLevel, setCredits, setMyShips,
          }, toast);
        }

        return null;
      })
      .then(() => (
        cargo.length > 0
          ? Promise.all(cargo.map(({ good, quantity }) => api.sellOrders.sellTradeGoods({
            shipId, good, quantity,
          }, toast)))
          : null
      ))
      .then(() => (
        trade({
          shipId,
          good: nodes[i][1],
          destination: nodes[i][0],
          setCredits,
          setMyShips,
          setMarketLocation,
        }, toast)
      ))
      .then(() => (
        route({
          shipId, nodes, setCredits, setMyShips, setMarketLocation,
        }, toast, i + 1)
      ));
  } else {
    i = nextNode;
    i %= nodes.length;
    trade({
      shipId,
      good: nodes[i][1],
      destination: nodes[i][0],
      setCredits,
      setMyShips,
      setMarketLocation,
    }, toast)
      .then(() => {
        route({
          shipId, nodes, setCredits, setMyShips, setMarketLocation,
        }, toast, i + 1);
      });
  }
};

export default route;
