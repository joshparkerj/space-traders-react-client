import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';
import fetchData from './fetch-data';

const getMyLoans = function getMyLoans(setter) {
  fetchData(`${root}my/loans?token=${token}`, setter, 'loans', 'id');
};

const payOffYourLoan = function payOffYourLoan({ loan }, toast) {
  return new Promise((resolve) => {
    fetchPost(`${root}my/loans/${loan.id}?token=${token}&loanId=${loan.id}&type=${loan.type}`, 'PUT')
      .then((json) => {
        toast.success('loan repaid!');
        resolve(json);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  });
};

const takeOutALoan = function takeOutALoan({ type, setLoans, setCredits }, toast) {
  fetchPost(`${root}my/loans?token=${token}&type=${type}`)
    .then((json) => {
      setLoans((l) => [...l, json.loan]);
      setCredits(json.credits);
    })
    .catch((err) => toast.error(err.message));
};

const loans = {
  getMyLoans,
  payOffYourLoan,
  takeOutALoan,
};

export default loans;
