import root from './root';
import token from './space-traders-api-access-token';
import fetchData from './fetch-data';

// https://api.spacetraders.io/#api-types

const getTypesOfGoods = function getTypesOfGoods(setter) {
  fetchData(`${root}types/goods?token=${token}`, setter, 'goods', 'symbol').catch(() => { });
};

const getTypesOfLoans = function getTypesOfLoans(setter) {
  fetchData(`${root}types/loans?token=${token}`, setter, 'loans', 'type').catch(() => { });
};

// TODO: Get available structures

// TODO: Get info on available ships

const types = {
  getTypesOfGoods,
  getTypesOfLoans,
};

export default types;
