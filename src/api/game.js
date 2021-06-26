import root from './root';
import fetchData from './fetch-data';

const getGameStatus = function getGameStatus(setter) {
  fetchData(`${root}game/status`, setter, 'status');
};

const game = {
  getGameStatus,
};

export default game;
