import root from './root';
import token from './space-traders-api-access-token';
import fetchData from './fetch-data';

// https://api.spacetraders.io/#api-locations

// TODO: get info on a location
const getLocation = function getLocation(location, setter) {
  return new Promise((resolve, reject) => {
    fetchData(`${root}locations/${location}?token=${token}`, setter, 'location')
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });
};

const getLocationMarketplaces = function getLocationsMarketplaces(location, setter) {
  return new Promise((resolve, reject) => {
    fetchData(`${root}locations/${location}/marketplace?token=${token}`, setter, 'marketplace')
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

// TODO: get the ships at a location

const locations = {
  getLocation,
  getLocationMarketplaces,
};

export default locations;
