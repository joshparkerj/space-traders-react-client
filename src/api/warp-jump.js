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
        const seconds = timeRemainingInSeconds % 60;
        if (timeRemainingInSeconds >= 60) {
          const minutes = Math.floor(timeRemainingInSeconds / 60);
          if (seconds > 0) {
            time = `${minutes} minute${minutes === 1 ? '' : 's'} and ${timeRemainingInSeconds % 60} second${seconds === 1 ? '' : 's'}`;
          } else {
            time = `${minutes} minute${minutes === 1 ? '' : 's'}`;
          }
        } else {
          time = `${seconds} second${seconds === 1 ? '' : 's'}`;
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
