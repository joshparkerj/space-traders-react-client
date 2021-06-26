import fetchData from './fetch-data';
import fetchWithRetry from './fetch-with-retry';
import fetchPost from './fetch-post';

import token from './space-traders-api-access-token';

const root = 'https://api.spacetraders.io/';

const getMyAccount = function getMyAccount(setter) {
  fetchData(`${root}my/account?token=${token}`, setter, 'user', 'username');
};

const getMyLoans = function getMyLoans(setter) {
  fetchData(`${root}my/loans?token=${token}`, setter, 'loans', 'id');
};

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

const getMyShips = function getMyShips(setter) {
  fetchData(`${root}my/ships?token=${token}`, setter, 'ships', 'id');
};

const getGameStatus = function getGameStatus(setter) {
  fetchData(`${root}game/status`, setter, 'status');
};

const getTypesOfGoods = function getTypesOfGoods(setter) {
  fetchData(`${root}types/goods?token=${token}`, setter, 'goods', 'symbol');
};

const getLocationMarketplaces = function getLocationsMarketplaces(location, setter) {
  return new Promise((resolve, reject) => {
    fetchData(`${root}locations/${location}/marketplace?token=${token}`, setter, 'marketplace', 'symbol')
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

const getSystemLocations = function getSystemLocations(system, setter) {
  return new Promise((resolve) => {
    resolve(fetchData(`${root}systems/${system}/locations?token=${token}`, setter, 'locations', 'symbol'));
  });
};

const getTypesOfLoans = function getTypesOfLoans(setter) {
  fetchData(`${root}types/loans?token=${token}`, setter, 'loans', 'type');
};

const getSystemFlightPlans = function getSystemFlightPlans(systemSymbol, setter) {
  fetchData(`${root}systems/${systemSymbol}/flight-plans?token=${token}`, setter, 'flightPlans', 'id');
};

const purchaseAShip = function purchaseAShip(
  {
    location, type, setMyShips, setCredits,
  }, toast,
) {
  fetchPost(`${root}my/ships?token=${token}&location=${location}&type=${type}`)
    .then((json) => {
      setMyShips((s) => [...s, json.ship]);
      setCredits(json.user.credits);
    })
    .catch((err) => toast.error(err));
};

const placeANewPurchaseOrder = function placeANewPurchaseOrder(
  {
    shipId, good, quantity, setCredits, setMyShips,
  }, toast,
) {
  return new Promise((resolve, reject) => {
    fetchPost(`${root}my/purchase-orders?token=${token}&shipId=${shipId}&good=${good}&quantity=${quantity}`)
      .then((json) => {
        setCredits(json.credits);
        setMyShips((s) => [...s.map((ship) => (ship.id === json.ship.id ? json.ship : ship))]);
        const { quantity: orderQuantity, good: orderGood, total } = json.order;
        toast.success(`bought ${orderQuantity} ${orderGood} for ${total}`);
        resolve(json);
      })
      .catch((err) => {
        if (err.message === 'Quantity purchased exceeds ship\'s loading speed.') {
          toast.error(`${err.message}\nMax loading speed is ${err.data.loadingSpeed}`);
        } else {
          toast.error(err);
        }

        reject(err);
      });
  });
};

const takeOutALoan = function takeOutALoan({ type, setLoans, setCredits }, toast) {
  fetchPost(`${root}my/loans?token=${token}&type=${type}`)
    .then((json) => {
      setLoans((l) => [...l, json.loan]);
      setCredits(json.credits);
    })
    .catch((err) => toast.error(err));
};

const createFlightPlan = function createFlightPlan({ shipId, destination }, toast) {
  return new Promise((resolve, reject) => {
    fetchPost(`${root}my/flight-plans?token=${token}&shipId=${shipId}&destination=${destination}`)
      .then((json) => {
        const {
          destination: flightPlanDestination, fuelConsumed, timeRemainingInSeconds,
        } = json.flightPlan;
        let time;
        if (timeRemainingInSeconds >= 60) {
          if (timeRemainingInSeconds % 60 > 0) {
            time = `${Math.floor(timeRemainingInSeconds / 60)} minutes and ${timeRemainingInSeconds % 60} seconds`;
          } else {
            time = `${timeRemainingInSeconds / 60} minutes`;
          }
        } else {
          time = `${timeRemainingInSeconds} seconds`;
        }

        toast.success(`flying to ${flightPlanDestination}. Will use ${fuelConsumed} fuel and arrive in ${time}`);
        resolve(json);
      })
      .catch((err) => {
        toast.error(err);
        reject(err);
      });
  });
};

const sellTradeGoods = function sellTradeGoods({ shipId, good, quantity }, toast) {
  return new Promise((resolve) => {
    fetchPost(`${root}my/sell-orders?token=${token}&shipId=${shipId}&good=${good}&quantity=${quantity}`)
      .then((json) => {
        const { good: orderGood, total, quantity: orderQuantity } = json.order;
        toast.success(`sold ${orderQuantity} ${orderGood} for ${total}`);
        resolve(json);
      })
      .catch((err) => {
        if (err.message === 'Quantity purchased exceeds ship\'s loading speed.') {
          toast.error(`${err.message}\nMax loading speed is ${err.data.loadingSpeed}`);
        } else {
          toast.error(err);
        }
      });
  });
};

const payOffYourLoan = function payOffYourLoan({ loan }, toast) {
  return new Promise((resolve) => {
    fetchPost(`${root}my/loans/${loan.id}?token=${token}&loanId=${loan.id}&type=${loan.type}`, 'PUT')
      .then((json) => {
        toast.success('loan repaid!');
        resolve(json);
      })
      .catch((err) => {
        toast.error(err);
      });
  });
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
  createFlightPlan,
  getSystemFlightPlans,
  sellTradeGoods,
  payOffYourLoan,
};

export default api;
