import root from './root';
import token from './space-traders-api-access-token';
import fetchData from './fetch-data';

const getMyAccount = function getMyAccount(setter) {
  return new Promise((resolve) => {
    fetchData(`${root}my/account?token=${token}`, setter, 'user', 'username')
      .then((r) => resolve(r));
  });
};

const account = {
  getMyAccount,
};

export default account;
