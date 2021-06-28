import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Data = function Data({
  name, fields, records, RowComponent,
}) {
  const [show, setShow] = useState(true);
  return (
    <table className={name.replace(' ', '-')}>
      <caption>{name}</caption>
      <button type="button" onClick={() => setShow((prev) => !prev)}>{show ? 'hide' : 'show'}</button>
      <thead>
        <tr>
          {fields.map((field) => <th key={field}>{field}</th>)}
        </tr>
      </thead>
      <tbody className={show ? '' : 'hidden'}>
        {records.map((record) => <RowComponent key={record.id} record={record} />)}
      </tbody>
    </table>
  );
};

Data.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  records: PropTypes.arrayOf(PropTypes.object),
  RowComponent: PropTypes.elementType.isRequired,
};

Data.defaultProps = {
  records: [],
};

export default Data;
