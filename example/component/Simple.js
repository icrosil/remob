import React from 'react';
import PropTypes from 'prop-types';

const Simple = ({ value, onClick, formattedValue }) => (
  <div>
    {value}
    <br />
    {formattedValue}
    <button onClick={onClick}>randomize</button>
  </div>
);

Simple.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  formattedValue: PropTypes.number.isRequired,
};

export default Simple;
