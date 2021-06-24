import React from 'react';
// import { useState, useEffect } from 'react';
import moment from 'moment';

import useUserAccount from './use-user-account';
import token from './space-traders-api-access-token';
// import logo from './logo.svg';
import './App.css';

function Client() {
  // const [user, setUser] = useState({
  //   credits: 0,
  //   joinedAt: '',
  //   shipCount: 0,
  //   structureCount: 0,
  //   username: ''
  // });

  // useEffect(() => {
  //   fetch(`https://api.spacetraders.io/my/account?token=${token}`)
  //     .then(r => r.json())
  //     .then(userResponse => setUser(userResponse.user));
  // }, []);

  const user = useUserAccount(token);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Space Traders React Client</h1>
      </header>
      <main>
        <table>
          <caption>users</caption>
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>ships</th>
              <th>structures</th>
              <th>credits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user?.username}</td>
              <td>{moment(user?.joinedAt).fromNow(true)}</td>
              <td>{user?.shipCount}</td>
              <td>{user?.structureCount}</td>
              <td>{user?.credits}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Client;
