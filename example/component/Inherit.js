import React from 'react';
import PropTypes from 'prop-types';

const Inherit = ({
  valueOne,
  valueTwo,
  onClickOne,
  onClickTwo,
}) => (
  <div>
    {valueOne}
    <button onClick={onClickOne}>randomize1</button>
    <br />
    {valueTwo}
    <button onClick={onClickTwo}>randomize2</button>
  </div>
);

Inherit.propTypes = {
  onClickOne: PropTypes.func.isRequired,
  onClickTwo: PropTypes.func.isRequired,
  valueOne: PropTypes.number.isRequired,
  valueTwo: PropTypes.number.isRequired,
};

export default Inherit;
