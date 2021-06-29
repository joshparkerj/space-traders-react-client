import React, { useState } from 'react';
import PropTypes from 'prop-types';

import api from '../api/api';
import handleChange from './helpers/handle-change';
import handleSubmit from './helpers/handle-submit';

const CheckSystem = function CheckSystem({ toast }) {
  const [checkSystem, setCheckSystem] = useState('');

  return (
    <form
      className="check system"
      onSubmit={handleSubmit(
        api.systems.getSystem,
        {
          system: checkSystem,
        },
        toast,
      )}
    >
      <h3>check system symbol (two capital letters probably)</h3>
      <input {...{ value: checkSystem }} type="text" onChange={handleChange(setCheckSystem)} />
      <input type="submit" value="Submit" />
    </form>
  );
};

CheckSystem.propTypes = {
  toast: PropTypes.func.isRequired,
};

export default CheckSystem;
