import React from 'react';
import PropTypes from 'prop-types';
import Datum from './Datum';

import ageFromTimestamp from '../util/age-from-timestamp';

const User = function User({ record: user }) {
  return (
    <Datum
      name="user"
      details={[
        user.username,
        ageFromTimestamp(user.joinedAt),
        user.shipCount,
        user.structureCount,
        user.credits,
      ].map((e, i) => ({ detail: e, id: i }))}
    />
  );
};

User.propTypes = {
  record: PropTypes.shape({
    username: PropTypes.string.isRequired,
    joinedAt: PropTypes.string.isRequired,
    shipCount: PropTypes.number.isRequired,
    structureCount: PropTypes.number.isRequired,
    credits: PropTypes.number,
  }).isRequired,
};

export default User;
