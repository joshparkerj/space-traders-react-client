import root from './root';
import token from './space-traders-api-access-token';
import fetchData from './fetch-data';

const getMyAccount = function getMyAccount(setter) {
  fetchData(`${root}my/account?token=${token}`, setter, 'user', 'username');
};

const account = {
  getMyAccount,
};

export default account;
