import React from 'react';
import PropTypes from 'prop-types';

const Simple = ({
  value,
  onClick,
  formattedValue,
  onClickThunk,
  onClickDeep,
  valueDeep,
}) => (
  <div>
    {value}
    <br />
    {formattedValue}
    <br />
    {valueDeep.field}
    <button onClick={onClick}>randomize</button>
    <button onClick={onClickDeep}>deep.randomize</button>
    <button onClick={onClickThunk}>thunkRandomize</button>
  </div>
);

Simple.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClickThunk: PropTypes.func.isRequired,
  onClickDeep: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  formattedValue: PropTypes.number.isRequired,
  valueDeep: PropTypes.shape({}).isRequired,
};

export default Simple;
