import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Simple from '../component/Simple';
import Inherit from '../component/Inherit';
import { randomize, formatValue, thunkRandomize } from '../store/simple/redux';
import { randomizeOne, randomizeTwo } from '../store/inherit/redux';

const ReduxComponent = ({
  simple,
  inherit,
  onClick,
  onClickThunk,
  onClickOne,
  onClickTwo,
}) => (
  <div>
    <Simple
      value={simple.field}
      formattedValue={formatValue(simple.field)}
      onClick={onClick}
      onClickThunk={onClickThunk}
    />
    <Inherit
      valueOne={inherit.fieldOne}
      valueTwo={inherit.fieldTwo}
      onClickOne={onClickOne}
      onClickTwo={onClickTwo}
    />
  </div>
);

ReduxComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  inherit: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  onClickThunk: PropTypes.func.isRequired,
  onClickOne: PropTypes.func.isRequired,
  onClickTwo: PropTypes.func.isRequired,
};

export default connect(
  state => state,
  dispatch => ({
    onClick: () => randomize(dispatch),
    onClickThunk: () => thunkRandomize(dispatch),
    onClickOne: () => randomizeOne(dispatch),
    onClickTwo: () => randomizeTwo(dispatch),
  }),
)(ReduxComponent);
