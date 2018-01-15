import React from 'react';
import PropTypes from 'prop-types';

const Simple = ({
  value,
  onClick,
  formattedValue,
  onClickThunk,
}) => (
  <div>
    {value}
    <br />
    {formattedValue}
    <button onClick={onClick}>randomize</button>
    <button onClick={onClickThunk}>thunkRandomize</button>
  </div>
);

Simple.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClickThunk: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  formattedValue: PropTypes.number.isRequired,
};

export default Simple;
