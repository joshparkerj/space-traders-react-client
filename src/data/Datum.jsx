import React from 'react';
import PropTypes from 'prop-types';

const Datum = function Datum({ name, details }) {
  return (
    <tr className={name.replace(' ', '-')}>
      {details.map(({ id, detail }) => <td key={id}>{detail}</td>)}
    </tr>
  );
};

Datum.propTypes = {
  name: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Datum;
