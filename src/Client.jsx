import React, { useState, useEffect } from 'react';

// import useUserAccounts from './use-user-accounts';
// import useLoanTypes from './use-loan-types';
import token from './space-traders-api-access-token';
import Users from './data/Users';
import LoanTypes from './data/LoanTypes';
import Loans from './data/Loans';
import TakeOutALoan from './forms/TakeOutALoan';
import './App.css';

function Client() {
  // const users = useUserAccounts(token);
  // const { loanTypes, credits } = useLoanTypes(token);
  // const loans = useLoans(token);
  const [users, setUsers] = useState([]);
  const [loanTypes, setLoanTypes] = useState([]);
  const [credits, setCredits] = useState(null);
  const [loans, setLoans] = useState([]);
  const [takeOutALoanValue, setTakeOutALoanValue] = useState('');

  useEffect(() => {
    const takeOutALoan = function takeOutALoan(type) {
      return () => {
        const fetchAddress = `https://api.spacetraders.io/my/loans?token${token}&type=${type}`;
        const fetchOptions = {
          method: 'POST',
        };
        fetch(fetchAddress, fetchOptions)
          .then((r) => r.json())
          .then((jsonResponse) => {
            setLoanTypes((l) => [...l, jsonResponse.loan]);
            setCredits(jsonResponse.credits);
          });
      };
    };

    fetch(`https://api.spacetraders.io/types/loans?token=${token}`)
      .then((r) => r.json())
      .then((jsonResponse) => {
        const newLoans = jsonResponse.loans.map((loan) => ({
          ...loan,
          takeOutALoan: takeOutALoan(loan.type),
        }));

        setLoanTypes((l) => (
          [...l, ...newLoans.filter((newLoan) => !l.map((e) => e.type).includes(newLoan.type))]
        ));
      });
  }, [loans]);

  useEffect(() => {
    fetch(`https://api.spacetraders.io/my/account?token=${token}`)
      .then((r) => r.json())
      .then(({ user }) => setUsers((u) => {
        if (u.map((e) => e.username).includes(user.username)) {
          return u;
        }

        return [...u, user];
      }));

    fetch(`https://api.spacetraders.io/my/loans?token=${token}`)
      .then((r) => r.json())
      .then((loansResponse) => setLoans((l) => [...l, ...loansResponse.loans]));
  }, []);

  const handleChange = function handleChange(setter) {
    return function changeHandler({ target }) {
      setter(target.value);
    };
  };

  const handleSubmit = function handleSubmit(fetchAddress, fetchOptions, jsonHandler) {
    return function submitHandler(event) {
      fetch(fetchAddress, fetchOptions)
        .then((r) => r.json())
        .then((json) => jsonHandler(json));
      event.preventDefault();
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Space Traders React Client</h1>
      </header>
      <main>
        <div className="credits">
          <span>credits:</span>
          <span>{credits}</span>
        </div>
        <section className="data">
          <h2>data</h2>
          <Users users={users} />
          <LoanTypes loans={loanTypes} />
          <Loans loans={loans} />
        </section>
        <section className="forms">
          <h2>forms</h2>
          <TakeOutALoan
            loanTypes={loanTypes.map((e) => e.type)}
            value={takeOutALoanValue}
            handleChange={handleChange(setTakeOutALoanValue)}
            handleSubmit={handleSubmit(`https://api.spacetraders.io/my/loans?token=${token}&type=${takeOutALoanValue}`, { method: 'POST' }, (json) => {
              setLoans((l) => [...l, json.loan]);
              setCredits(json.credits);
            })}
          />
        </section>
      </main>
    </div>
  );
}

export default Client;
