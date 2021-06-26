import route from './route';

const staticRoute = function staticRoute({
  shipId, setCredits, setMyShips, setMarketLocation,
}, toast) {
  const nodes = [
    ['OE-KO', 'CHEMICALS'],
    ['OE-PM-TR', 'CONSTRUCTION_MATERIALS'],
    ['OE-PM', 'METALS'],
    ['OE-UC-OB', 'DRONES'],
  ];

  route({
    shipId, nodes, setCredits, setMyShips, setMarketLocation,
  }, toast);
};

export default staticRoute;

// import trade from './trade';

// const staticRoute = function staticRoute({
//   shipId, setCredits, setMyShips, setMarketLocation,
// }, toast) {
//   // start at OE-UC-OB, load up on chemicals, fly to OE-KO, sell chemicals
//   trade({
//     shipId, good: 'CHEMICALS', destination: 'OE-KO', setCredits, setMyShips, setMarketLocation,
//   }, toast)
//    // from OE-KO, load up on construction materials, fly to OE-PM-TR, sell construction materials
//     .then(() => trade({
//       shipId, good: 'CONSTRUCTION_MATERIALS', destination: 'OE-PM-TR', ... ...,
//     }, toast))
//     // from OE-PM-TR, load up on metals, fly to OE-PM, sell metals
//     .then(() => trade({
//       shipId, good: 'METALS', destination: 'OE-PM', setCredits, setMyShips, setMarketLocation,
//     }, toast))
//     // from OE-PM, load up on drones, fly to OE-UC-OB, sell drones
//     .then(() => trade({
//       shipId, good: 'DRONES', destination: 'OE-UC-OB', setCredits, setMyShips, setMarketLocation,
//     }, toast))
//     // and that's the loop!
//     // might as well go for another whirl!
//     .then(() => staticRoute({
//       shipId, setCredits, setMyShips, setMarketLocation,
//     }, toast));
// };

// export default staticRoute;
