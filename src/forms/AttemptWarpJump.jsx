import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

import api from '../api/api';
import handleSubmit from './helpers/handle-submit';
import handleChange from './helpers/handle-change';

const AttemptWarpJump = function AttemptWarpJump({ myShips, toast }) {
  const [warpShip, setWarpShip] = useState('');

  return (
    <form
      className="attempt-warp-jump"
      onSubmit={handleSubmit(
        api.warpJump.attemptAWarpJump,
        {
          shipId: warpShip,
        },
        toast,
      )}
    >
      <h3>Attempt a warp jump</h3>
      <LabelForSelect
        {...{ value: warpShip, handleChange }}
        value={warpShip}
        handleChange={handleChange(setWarpShip)}
        id="warp-jump-ship-id"
        name="ship id"
        options={myShips.map((ship) => (
          { optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }
        ))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

AttemptWarpJump.propTypes = {
  myShips: PropTypes.arrayOf(PropTypes.object),
  toast: PropTypes.func.isRequired,
};

AttemptWarpJump.defaultProps = {
  myShips: [],
};

export default AttemptWarpJump;
