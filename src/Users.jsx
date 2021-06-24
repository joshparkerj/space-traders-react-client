import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const Users = function Users({ users }) {
  return (
    <table className="users">
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
        {users.map((user) => <User key={user.username} user={user} />)}
      </tbody>
    </table>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Users;
