import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';

// TODO: get my flight plans

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
        toast.error(err.message);
        reject(err);
      });
  });
};

const flightPlans = {
  createFlightPlan,
};

export default flightPlans;
