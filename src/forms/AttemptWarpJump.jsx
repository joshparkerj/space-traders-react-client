import React from 'react';
import PropTypes from 'prop-types';

import LabelForSelect from './LabelForSelect';

const AttemptWarpJump = function AttemptWarpJump({
  ships, value, handleChange, handleSubmit,
}) {
  return (
    <form className="attempt-warp-jump" onSubmit={handleSubmit}>
      <h3>Attempt a warp jump</h3>
      <LabelForSelect
        {...{ value, handleChange }}
        id="warp-jump-ship-id"
        name="ship id"
        options={ships.map((ship) => ({ optionName: `${ship.manufacturer} at ${ship.location}`, optionValue: ship.id }))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

AttemptWarpJump.propTypes = {
  ships: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AttemptWarpJump.defaultProps = {
  ships: [],
};

export default AttemptWarpJump;
