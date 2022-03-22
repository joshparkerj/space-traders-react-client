import root from './root';
import token from './space-traders-api-access-token';
import fetchPost from './fetch-post';
import fetchData from './fetch-data';

const getMyLoans = function getMyLoans(setter) {
  fetchData(`${root}my/loans?token=${token}`, setter, 'loans', 'id').catch(() => { });
};

const payOffYourLoan = function payOffYourLoan({ loan }, toast) {
  return new Promise((resolve) => {
    const { id, type } = loan;
    fetchPost(`${root}my/loans/${id}?token=${token}&loanId=${id}&type=${type}`, 'PUT')
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
