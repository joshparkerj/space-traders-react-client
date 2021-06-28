import root from './root';
import token from './space-traders-api-access-token';
import fetchData from './fetch-data';
import fetchWithRetry from './fetch-with-retry';

// https://api.spacetraders.io/#api-systems

const getSystemShipListings = function getSystemShipListings(setter) {
  // TODO: use fetchData function here (it will need to be updated)
  fetchWithRetry(`${root}systems/OE/ship-listings?token=${token}`)
    .then((r) => r.json())
    .then(({ shipListings }) => {
      const reducedListings = shipListings.reduce((acc, e) => {
        const { purchaseLocations, ...noLoc } = e;
        return [...acc, ...purchaseLocations.map((loc) => ({ ...loc, ...noLoc }))];
      }, []);
      setter((s) => (
        [
          ...s,
          ...[...reducedListings].sort((a, b) => a.price - b.price).filter((ship) => (
            !s.map((e) => e.type + e.location).includes(ship.type + ship.location)
          )),
        ]
      ));
    });
};

const getSystemFlightPlans = function getSystemFlightPlans(systemSymbol, setter) {
  fetchData(`${root}systems/${systemSymbol}/flight-plans?token=${token}`, setter, 'flightPlans', 'id');
};

// TODO: get info on a system's docked ships

const getSystemLocations = function getSystemLocations(system, setter) {
  return new Promise((resolve) => {
    fetchData(`${root}systems/${system}/locations?token=${token}`, setter, 'locations', 'symbol')
      .then((r) => resolve(r));
  });
};

// TODO: Get systems info
const getSystem = function getSystem({ system }, toast) {
  return new Promise((resolve) => {
    fetchData(`${root}systems/${system}?token=${token}`, () => { }, 'system')
      .then(({ system: sys }) => {
        toast(`${sys.symbol} stands for the ${sys.name} system!`);
        resolve(sys);
      });
  });
};

const systems = {
  getSystemShipListings,
  getSystemFlightPlans,
  getSystemLocations,
  getSystem,
};

export default systems;
