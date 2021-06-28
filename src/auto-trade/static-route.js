import route from './route';

const staticRoute = function staticRoute({
  name, shipId, setCredits, setMyShips, setMarketLocation,
}, toast) {
  const staticRoutes = {
    'Omicron Eridani': [
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
    ],
    Xiav: [
      { destination: 'XV-SN', good: 'MACHINERY', size: 2 },
      { destination: 'XV-ST', good: 'CHEMICALS', size: 1 },
      { destination: 'XV-CB-IT', good: 'MACHINERY', size: 2 },
      { destination: 'XV-OS', good: 'CONSUMER_GOODS', size: 1 },
      { destination: 'XV-XA', good: 'DRONES', size: 1 },
      { destination: 'XV-ST-BG', good: 'EXPLOSIVES', size: 1 },
      { destination: 'XV-ST', good: 'METALS', size: 1 },
      { destination: 'XV-CB-IT', good: 'MACHINERY', size: 2 },
      { destination: 'XV-OS', good: 'CONSUMER_GOODS', size: 1 },
      { destination: 'XV-XA', good: 'DRONES', size: 1 },
      { destination: 'XV-CB-NM', good: 'CONSTRUCTION_MATERIALS', size: 1 },
      { destination: 'XV-XA', good: 'RARE_METALS', size: 1 },
      { destination: 'XV-CB-NM', good: 'CONSTRUCTION_MATERIALS', size: 1 },
      { destination: 'XV-ST', good: 'METALS', size: 1 },
      { destination: 'XV-CB-IT', good: 'MACHINERY', size: 2 },
      { destination: 'XV-OS', good: 'CONSUMER_GOODS', size: 1 },
      { destination: 'XV-SN', good: 'DRONES', size: 1 },
      { destination: 'XV-ST', good: 'CHEMICALS', size: 1 },
    ],
  };

  route({
    shipId, nodes: staticRoutes[name], setCredits, setMyShips, setMarketLocation,
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
