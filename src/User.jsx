import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const User = function User({ user }) {
  return (
    <tr className="user">
      <td>{user.username}</td>
      <td>{moment(user.joinedAt).fromNow(true)}</td>
      <td>{user.shipCount}</td>
      <td>{user.structureCount}</td>
      <td>{user.credits}</td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    joinedAt: PropTypes.string.isRequired,
    shipCount: PropTypes.number.isRequired,
    structureCount: PropTypes.number.isRequired,
    credits: PropTypes.number.isRequired,
  }).isRequired,
};

export default User;
