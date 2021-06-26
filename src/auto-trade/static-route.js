import trade from './trade';

const staticRoute = function staticRoute({ shipId, setCredits, setMyShips }, toast) {
  // start at OE-UC-OB, load up on chemicals, fly to OE-KO, sell chemicals
  trade({
    shipId, good: 'CHEMICALS', destination: 'OE-KO', setCredits, setMyShips,
  }, toast)
    // from OE-KO, load up on construction materials, fly to OE-PM-TR, sell construction materials
    .then(() => trade({
      shipId, good: 'CONSTRUCTION_MATERIALS', destination: 'OE-PM-TR', setCredits, setMyShips,
    }, toast))
    // from OE-PM-TR, load up on metals, fly to OE-PM, sell metals
    .then(() => trade({
      shipId, good: 'METALS', destination: 'OE-PM', setCredits, setMyShips,
    }, toast))
    // from OE-PM, load up on drones, fly to OE-UC-OB, sell drones
    .then(() => trade({
      shipId, good: 'DRONES', destination: 'OE-UC-OB', setCredits, setMyShips,
    }, toast))
    // and that's the loop!
    // might as well go for another whirl!
    .then(() => staticRoute({ shipId, setCredits, setMyShips }, toast));
};

export default staticRoute;
