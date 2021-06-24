import React from 'react';
import PropTypes from 'prop-types';

import User from './User';
import Data from './Data';

const Users = function Users({ users }) {
  return (
    <Data name="users" fields={['name', 'age', 'ships', 'structures', 'credits']} records={users.map((e) => ({ ...e, id: e.username }))} RowComponent={User} />
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

Users.defaultProps = {
  users: [],
};

export default Users;
