import React from 'react';
import PropTypes from 'prop-types';

const Inherit = ({
  valueOne,
  valueTwo,
  valueThree,
  onClickOne,
  onClickTwo,
  onClickThree,
}) => (
  <div>
    {valueOne}
    <button onClick={onClickOne}>randomize1</button>
    <br />
    {valueTwo}
    <button onClick={onClickTwo}>randomize2</button>
    <br />
    {valueThree}
    <button onClick={onClickThree}>randomize3</button>
  </div>
);

Inherit.propTypes = {
  onClickOne: PropTypes.func.isRequired,
  onClickTwo: PropTypes.func.isRequired,
  onClickThree: PropTypes.func.isRequired,
  valueOne: PropTypes.number.isRequired,
  valueTwo: PropTypes.number.isRequired,
  valueThree: PropTypes.number.isRequired,
};

export default Inherit;
