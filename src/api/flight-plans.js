import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';
import timeFromSeconds from '../util/time-from-seconds';

// TODO: get my flight plans

const createFlightPlan = function createFlightPlan({ shipId, destination }, toast) {
  return new Promise((resolve, reject) => {
    fetchPost(`${root}my/flight-plans?token=${token}&shipId=${shipId}&destination=${destination}`)
      .then((json) => {
        const {
          destination: flightPlanDestination, fuelConsumed, timeRemainingInSeconds,
        } = json.flightPlan;

        toast.success(`flying to ${flightPlanDestination}. Will use ${fuelConsumed} fuel and arrive in ${timeFromSeconds(timeRemainingInSeconds)}`);
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
