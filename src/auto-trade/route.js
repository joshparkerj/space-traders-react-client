import trade from './trade';
import api from '../api/api';

// TODO: add an option to stop a ship from continuing its loop at any time.
const route = function route({
  shipId, nodes, setCredits, setMyShips, setMarketLocation,
}, toast, nextNode, spaceAvailable, loadingSpeed) {
  let i;
  if (nextNode === undefined) {
    let cargo;
    let shipSpaceAvailable;
    let shipLoadingSpeed;
    api.ships.getMyShip(shipId)
      .then(({ ship }) => {
        i = 1 + nodes.findIndex((node) => node.destination === ship.location);
        i %= nodes.length;
        shipSpaceAvailable = ship.maxCargo - 20;
        shipLoadingSpeed = ship.loadingSpeed;
        const fuelLevel = ship.cargo.find((good) => good.good === 'FUEL')?.quantity || 0;
        cargo = ship.cargo.filter((good) => good.good !== 'FUEL').reduce((acc, e) => {
          const loads = [];
          for (let count = 0; count <= e.quantity; count += 25) {
            loads.push({ ...e, quantity: e.quantity - count >= 25 ? 25 : e.quantity - count });
          }

          return acc.concat(loads);
        }, []);

        toast(`beginning route by flying to ${nodes[i].destination} with ${nodes[i].good}`);
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
          good: nodes[i].good,
          size: nodes[i].size,
          spaceAvailable: shipSpaceAvailable,
          loadingSpeed: shipLoadingSpeed,
          destination: nodes[i].destination,
          setCredits,
          setMyShips,
          setMarketLocation,
        }, toast)
      ))
      .then(() => (
        route({
          shipId, nodes, setCredits, setMyShips, setMarketLocation,
        }, toast, i + 1, shipSpaceAvailable, shipLoadingSpeed)
      ));
  } else {
    i = nextNode;
    i %= nodes.length;
    trade({
      shipId,
      good: nodes[i].good,
      size: nodes[i].size,
      destination: nodes[i].destination,
      setCredits,
      setMyShips,
      setMarketLocation,
    }, toast)
      .then(() => {
        route({
          shipId, nodes, setCredits, setMyShips, setMarketLocation,
        }, toast, i + 1, spaceAvailable, loadingSpeed);
      });
  }
};

export default route;
