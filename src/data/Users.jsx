import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import Data from './Data';

const Users = function Users({ users, credits }) {
  return (
    <Data
      name=""
      fields={['name', 'age', 'ships', 'structures', 'credits']}
      records={users.map((e) => ({ ...e, id: e.username, credits }))}
      RowComponent={User}
    />
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  credits: PropTypes.number,
};

Users.defaultProps = {
  users: [],
  credits: null,
};

export default Users;
