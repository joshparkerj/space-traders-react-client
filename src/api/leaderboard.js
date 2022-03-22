import root from './root';
import fetchData from './fetch-data';

const getGameLeaderboardNetWorth = function getGameStatus(setter) {
  // NOTE there is a second array, userNetWorth.
  fetchData(`${root}game/leaderboard/net-worth`, setter, 'netWorth').catch(() => { });
  // TODO: handle the second array also.
};

const leaderboard = {
  getGameLeaderboardNetWorth,
};

export default leaderboard;
