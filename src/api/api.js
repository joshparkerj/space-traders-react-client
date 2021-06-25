import fetchData from '../fetch-data';
import fetchWithRetry from '../fetch-with-retry';
import fetchPost from './fetch-post';

import token from '../space-traders-api-access-token';

const apiUrl = 'https://api.spacetraders.io/';

const getMyAccount = function getMyAccount(setter) {
  fetchData(`${apiUrl}my/account?token=${token}`, setter, 'user', 'username');
};

const getMyLoans = function getMyLoans(setter) {
  fetchData(`${apiUrl}my/loans?token=${token}`, setter, 'loans', 'id');
};

const getSystemShipListings = function getSystemShipListings(setter) {
  // fetchData();
  fetchWithRetry(`${apiUrl}systems/OE/ship-listings?token=${token}&class=MK-I`)
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

const getMyShips = function getMyShips(setter) {
  fetchData(`${apiUrl}my/ships?token=${token}`, setter, 'ships', 'id');
};

const getGameStatus = function getGameStatus(setter) {
  fetchData(`${apiUrl}game/status`, setter, 'status');
};

const getTypesOfGoods = function getTypesOfGoods(setter) {
  fetchData(`${apiUrl}types/goods?token=${token}`, setter, 'goods', 'symbol');
};

const getLocationMarketplaces = function getLocationsMarketplaces(location, setter) {
  fetchData(`${apiUrl}locations/${location}/marketplace?token=${token}`, setter, 'marketplace', 'symbol');
};

const getSystemLocations = function getSystemLocations(system, setter) {
  fetchData(`${apiUrl}systems/${system}/locations?token=${token}`, setter, 'locations', 'symbol');
};

const getTypesOfLoans = function getTypesOfLoans(setter) {
  fetchData(`${apiUrl}types/loans?token=${token}`, setter, 'loans', 'type');
};

const purchaseAShip = function purchaseAShip(
  {
    location, type, setMyShips, setCredits,
  }, toast,
) {
  fetchPost(`${apiUrl}my/ships?token=${token}&location=${location}&type=${type}`,
    (json) => {
      setMyShips((s) => [...s, json.ship]);
      setCredits(json.user.credits);
    },
    (err) => toast.error(err));
};

const placeANewPurchaseOrder = function placeANewPurchaseOrder(
  {
    shipId, good, quantity, setCredits, setMyShips,
  }, toast,
) {
  fetchPost(`${apiUrl}my/purchase-orders?token=${token}&shipId=${shipId}&good=${good}&quantity=${quantity}`,
    (json) => {
      setCredits(json.credits);
      setMyShips((s) => [...s.map((ship) => (ship.id === json.ship.id ? json.ship : ship))]);
      toast.success('purchase success!');
    },
    (err) => {
      if (err.message === 'Quantity purchased exceeds ship\'s loading speed.') {
        toast.error(`${err.message}\nMax loading speed is ${err.data.loadingSpeed}`);
      } else {
        toast.error(err);
      }
    });
};

const takeOutALoan = function takeOutALoan({ type, setLoans, setCredits }, toast) {
  fetchPost(`${apiUrl}my/loans?token=${token}&type=${type}`, (json) => {
    setLoans((l) => [...l, json.loan]);
    setCredits(json.credits);
  }, (err) => toast.error(err));
};

const api = {
  getMyAccount,
  getMyLoans,
  getSystemShipListings,
  getGameStatus,
  getMyShips,
  getTypesOfGoods,
  getLocationMarketplaces,
  getSystemLocations,
  getTypesOfLoans,
  purchaseAShip,
  placeANewPurchaseOrder,
  takeOutALoan,
};

export default api;
