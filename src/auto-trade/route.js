import trade from './trade';
import api from '../api/api';

// TODO: add an option to stop a ship from continuing its loop at any time.
const route = function route({
  ship, nodes, setCredits, setMyShips, setMarketLocation,
}, toast, nextNode) {
  let i;
  if (nextNode === undefined) {
    i = 1 + nodes.findIndex((node) => node.destination === ship.location);
    i %= nodes.length;
    const fuelLevel = ship.cargo.find((good) => good.good === 'FUEL')?.quantity || 0;
    const cargo = ship.cargo.filter((good) => good.good !== 'FUEL').reduce((acc, e) => {
      const loads = [];
      for (let count = 0; count <= e.quantity; count += 25) {
        loads.push({ ...e, quantity: e.quantity - count >= 25 ? 25 : e.quantity - count });
      }

      return acc.concat(loads);
    }, []);

    toast(`beginning route by flying to ${nodes[i].destination} with ${nodes[i].good}`);
    Promise.all(cargo.map(({ good, quantity }) => api.sellOrders.sellTradeGoods({
      shipId: ship.id, good, quantity, setCredits, setMyShips,
    }, toast)))
      .then(() => (fuelLevel < 20 ? api.purchaseOrders.placeANewPurchaseOrder({
        shipId: ship.id, good: 'FUEL', quantity: 20 - fuelLevel, setCredits, setMyShips,
      }, toast) : null))
      .then(() => (
        trade({
          ship,
          good: nodes[i].good,
          size: nodes[i].size,
          destination: nodes[i].destination,
          setCredits,
          setMyShips,
          setMarketLocation,
        }, toast)
      ))
      .then(() => (
        route({
          ship, nodes, setCredits, setMyShips, setMarketLocation,
        }, toast, i + 1)
      ));
  } else {
    i = nextNode;
    i %= nodes.length;
    trade({
      ship,
      good: nodes[i].good,
      size: nodes[i].size,
      destination: nodes[i].destination,
      setCredits,
      setMyShips,
      setMarketLocation,
    }, toast)
      .then(() => {
        route({
          ship, nodes, setCredits, setMyShips, setMarketLocation,
        }, toast, i + 1);
      });
  }
};

export default route;
