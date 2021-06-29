import React from 'react';
import PropTypes from 'prop-types';

const DataTableBody = function DataTableBody({
  show, useFilters, records, RowComponent, fields, filters, showFilters,
}) {
  return (
    <tbody className={show ? '' : 'hidden'}>
      {useFilters
        ? records.filter((record) => showFilters.reduce((acc, e, i) => {
          if (!e) {
            return acc;
          }

          if (typeof fields[i][1] === 'string') {
            return acc && String(record[fields[i][1]]).startsWith(filters[i]);
          }

          if (typeof fields[i][1] === 'function') {
            return acc && String(fields[i][1](record)).startsWith(filters[i]);
          }

          throw new Error('field value getter must be string or function');
        }, true)).map((record) => <RowComponent {...{ record }} key={record.id} />)
        : records.map((record) => <RowComponent {...{ record }} key={record.id} />)}
    </tbody>

  );
};

DataTableBody.propTypes = {
  show: PropTypes.bool.isRequired,
  useFilters: PropTypes.bool.isRequired,
  showFilters: PropTypes.arrayOf(PropTypes.bool).isRequired,
  records: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  RowComponent: PropTypes.elementType.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.array),
  ]).isRequired,
};

DataTableBody.defaultProps = {
  records: [],
};

export default DataTableBody;
