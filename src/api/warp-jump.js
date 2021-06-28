import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';

const attemptAWarpJump = function attemptAWarpJump({ shipId }, toast) {
  return new Promise((resolve, reject) => {
    fetchPost(`${root}my/warp-jumps?token=${token}&shipId=${shipId}`)
      .then((json) => {
        const {
          destination: warpJumpDestination, fuelConsumed, timeRemainingInSeconds,
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

        toast.success(`warping to ${warpJumpDestination}. Will use ${fuelConsumed} fuel and arrive in ${time}`);
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
