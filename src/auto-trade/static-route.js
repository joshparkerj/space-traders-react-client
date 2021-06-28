import route from './route';

const staticRoute = function staticRoute({
  shipId, setCredits, setMyShips, setMarketLocation,
}, toast) {
  const nodes = [
    ['OE-KO', 'CHEMICALS'],
    ['OE-PM-TR', 'CONSTRUCTION_MATERIALS'],
    ['OE-PM', 'METALS'],
    ['OE-UC-OB', 'DRONES'],
    ['OE-KO', 'CHEMICALS'],
    ['OE-NY', 'EXPLOSIVES'],
    ['OE-UC-OB', 'RARE_METALS'],
    ['OE-KO', 'CHEMICALS'],
    ['OE-PM', 'CONSUMER_GOODS'],
    ['OE-UC-OB', 'DRONES'],
  ];

  route({
    shipId, nodes, setCredits, setMyShips, setMarketLocation,
  }, toast);
};

export default staticRoute;
