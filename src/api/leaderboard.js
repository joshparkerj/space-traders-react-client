import root from './root';
import fetchData from './fetch-data';

const getGameLeaderboardNetWorth = function getGameStatus(setter) {
  fetchData(`${root}game/leaderboard/net-worth`, setter, 'netWorth'); // NOTE there is a second array, userNetWorth.
  // TODO: handle the second array also.
};

const leaderboard = {
  getGameLeaderboardNetWorth,
};

export default leaderboard;
