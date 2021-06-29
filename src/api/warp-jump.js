import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';
import timeFromSeconds from '../util/time-from-seconds';

const attemptAWarpJump = function attemptAWarpJump({ shipId }, toast) {
  return new Promise((resolve, reject) => {
    fetchPost(`${root}my/warp-jumps?token=${token}&shipId=${shipId}`)
      .then((json) => {
        const {
          destination: warpJumpDestination, fuelConsumed, timeRemainingInSeconds,
        } = json.flightPlan;

        toast.success(`warping to ${warpJumpDestination}. Will use ${fuelConsumed} fuel and arrive in ${timeFromSeconds(timeRemainingInSeconds)}`);
        resolve(json);
      })
      .catch((err) => {
        toast.error(err.message);
        reject(err);
      });
  });
};

const warpJump = {
  attemptAWarpJump,
};

export default warpJump;
