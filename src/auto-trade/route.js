import trade from './trade';
import api from '../api/api';

const route = function route({
  shipId, nodes, setCredits, setMyShips, setMarketLocation,
}, toast, nextNode) {
  let i;
  if (nextNode === undefined) {
    api.ships.getMyShip(shipId)
      .then((json) => {
        // TODO: check fuel and cargo, then buy fuel and sell cargo if needed.
        console.log(json);
        return json.ship.location;
      })
      .then((location) => {
        i = 1 + nodes.findIndex((node) => node[0] === location);
        i %= nodes.length;
        return trade({
          shipId,
          good: nodes[i][1],
          destination: nodes[i][0],
          setCredits,
          setMyShips,
          setMarketLocation,
        }, toast);
      })
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
