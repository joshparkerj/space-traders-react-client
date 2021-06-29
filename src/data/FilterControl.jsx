import React from 'react';
import PropTypes from 'prop-types';

const FilterControl = function FilterControl({
  i, showFilters, setShowFilters, filterInputId, filters, setFilters,
}) {
  return (
    <span className="filter-control">
      <input
        type="checkbox"
        checked={showFilters[i]}
        onChange={() => setShowFilters((f) => f.map((e, j) => (j === i ? !e : e)))}
      />
      {showFilters[i] && (
        <label htmlFor={filterInputId}>
          <input
            id={filterInputId}
            type="text"
            value={filters[i]}
            onChange={({ target }) => (
              setFilters((f) => f.map((e, j) => (j === i ? target.value : e)))
            )}
          />
        </label>
      )}
    </span>
  );
};

FilterControl.propTypes = {
  i: PropTypes.number.isRequired,
  showFilters: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setShowFilters: PropTypes.func.isRequired,
  filterInputId: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterControl;
