import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterControl from './FilterControl';
import DataTableBody from './DataTableBody';

const Data = function Data({
  name, fields, records, RowComponent,
}) {
  const [show, setShow] = useState(true);
  const [filters, setFilters] = useState(fields.map(() => ''));
  const [showFilters, setShowFilters] = useState(fields.map(() => false));
  let useFilters = false;
  if (Array.isArray(fields[0])) {
    useFilters = true;
  }

  useEffect(() => {
    setFilters(fields.map(() => ''));
    setShowFilters(fields.map(() => false));
  }, [fields]);

  return (
    <table className={name.replace(' ', '-')}>
      <caption>
        <input
          type="button"
          onClick={() => setShow((prev) => !prev)}
          value={show ? 'hide' : 'show'}
        />
        <br />
        {name}
      </caption>
      <thead>
        <tr>
          {fields.map((field, i) => {
            const key = useFilters ? field[0] : field;
            return (
              <th {...{ key }}>
                <span>{key}</span>
                {useFilters && (
                  <FilterControl
                    {...{
                      i, filters, setFilters, showFilters, setShowFilters,
                    }}
                    filterInputId={`${name.replace(' ', '-')}-filter-${i}`}
                  />
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <DataTableBody {...{
        show, useFilters, records, RowComponent, fields, filters, showFilters,
      }}
      />
    </table>
  );
};

Data.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.array),
  ]).isRequired,
  records: PropTypes.arrayOf(PropTypes.object),
  RowComponent: PropTypes.elementType.isRequired,
};

Data.defaultProps = {
  records: [],
};

export default Data;
