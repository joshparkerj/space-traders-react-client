import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';
import fetchData from './fetch-data';

// https://api.spacetraders.io/#api-ships

const purchaseAShip = function purchaseAShip({
  location, type, setMyShips, setCredits,
}, toast) {
  fetchPost(`${root}my/ships?token=${token}&location=${location}&type=${type}`)
    .then((json) => {
      setMyShips((s) => [...s, json.ship]);
      setCredits(json.credits);
    })
    .catch((err) => toast.error(err.message));
};

// TODO: Get your ship info
const getMyShip = function getMyShip(shipId, setter) {
  const noop = () => {};
  return new Promise((resolve, reject) => {
    fetchData(`${root}my/ships/${shipId}?token=${token}`, setter || noop, 'ship')
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });
};

const getMyShips = function getMyShips(setter) {
  fetchData(`${root}my/ships?token=${token}`, setter, 'ships', 'id').catch(() => { });
};

// TODO: Jettison cargo

// TODO: Scrap your ship for credits

// TODO: Transfer cargo between ships

const ships = {
  purchaseAShip,
  getMyShip,
  getMyShips,
};

export default ships;
