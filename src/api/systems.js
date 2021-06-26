import root from './root';
import token from './space-traders-api-access-token';
import fetchData from './fetch-data';
import fetchWithRetry from './fetch-with-retry';

// https://api.spacetraders.io/#api-systems

const getSystemShipListings = function getSystemShipListings(setter) {
  // TODO: use fetchData function here (it will need to be updated)
  fetchWithRetry(`${root}systems/OE/ship-listings?token=${token}&class=MK-I`)
    .then((r) => r.json())
    .then(({ shipListings }) => {
      const reducedListings = shipListings.reduce((acc, e) => {
        const { purchaseLocations, ...noLoc } = e;
        return [...acc, ...purchaseLocations.map((loc) => ({ ...loc, ...noLoc }))];
      }, []);
      setter((s) => (
        [
          ...s,
          ...reducedListings.filter((ship) => (
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
    resolve(fetchData(`${root}systems/${system}/locations?token=${token}`, setter, 'locations', 'symbol'));
  });
};

// TODO: Get systems info

const systems = {
  getSystemShipListings,
  getSystemFlightPlans,
  getSystemLocations,
};

export default systems;
