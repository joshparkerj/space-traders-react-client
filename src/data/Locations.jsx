import React from 'react';
import PropTypes from 'prop-types';

import Location from './Location';
import Data from './Data';

const Locations = function Locations({ locations }) {
  return (
    <Data
      name="locations"
      fields={[
        'name',
        'type',
        'coordinates',
        'symbol',
      ]}
      records={locations.map((e) => ({ ...e, id: e.symbol }))}
      RowComponent={Location}
    />
  );
};

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
};

Locations.defaultProps = {
  locations: [],
};

export default Locations;
