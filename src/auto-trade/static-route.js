import route from './route';

const staticRoute = function staticRoute({
  shipId, setCredits, setMyShips, setMarketLocation,
}, toast) {
  const nodes = [
    { destination: 'OE-KO', good: 'CHEMICALS', size: 1 },
    { destination: 'OE-PM-TR', good: 'CONSTRUCTION_MATERIALS', size: 1 },
    { destination: 'OE-PM', good: 'METALS', size: 1 },
    { destination: 'OE-UC-OB', good: 'DRONES', size: 1 },
    { destination: 'OE-KO', good: 'CHEMICALS', size: 1 },
    { destination: 'OE-NY', good: 'EXPLOSIVES', size: 1 },
    { destination: 'OE-UC-OB', good: 'RARE_METALS', size: 1 },
    { destination: 'OE-KO', good: 'CHEMICALS', size: 1 },
    { destination: 'OE-PM', good: 'CONSUMER_GOODS', size: 1 },
    { destination: 'OE-UC-OB', good: 'DRONES', size: 1 },
  ];

  route({
    shipId, nodes, setCredits, setMyShips, setMarketLocation,
  }, toast);
};

export default staticRoute;

// I previously had the data shaped like this:

// ['OE-PM-TR', 'CONSTRUCTION_MATERIALS'],
// ['OE-PM', 'METALS'],
// ['OE-UC-OB', 'DRONES'],
// ['OE-KO', 'CHEMICALS'],
// ['OE-NY', 'EXPLOSIVES'],
// ['OE-UC-OB', 'RARE_METALS'],
// ['OE-KO', 'CHEMICALS'],
// ['OE-PM', 'CONSUMER_GOODS'],
// ['OE-UC-OB', 'DRONES'],
// ];

// I used this pair of regular expressions to reshape it:
// \['([^']+)', '([^']+)'\]
// { destination: '$1', good: '$2', size: 1 }
