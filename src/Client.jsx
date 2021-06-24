import React from 'react';

import useUserAccounts from './use-user-accounts';
import useLoans from './use-loans';
import token from './space-traders-api-access-token';
import Users from './Users';
import Loans from './Loans';
import './App.css';

function Client() {
  const users = useUserAccounts(token);
  const loans = useLoans(token);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Space Traders React Client</h1>
      </header>
      <main>
        <Users users={users} />
        <Loans loans={loans} />
      </main>
    </div>
  );
}

export default Client;
