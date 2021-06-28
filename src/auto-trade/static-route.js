import route from './route';

const staticRoute = function staticRoute({
  name, ship, setCredits, setMyShips, setMarketLocation,
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
    ship, nodes: staticRoutes[name], setCredits, setMyShips, setMarketLocation,
  }, toast);
};

export default staticRoute;
