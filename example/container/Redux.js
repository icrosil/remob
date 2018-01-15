import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Simple from '../component/Simple';
import { randomize, formatValue, thunkRandomize } from '../store/simple/redux';

const ReduxComponent = ({ simple, onClick, onClickThunk }) => (
  <div>
    <Simple
      value={simple.field}
      formattedValue={formatValue(simple.field)}
      onClick={onClick}
      onClickThunk={onClickThunk}
    />
  </div>
);

ReduxComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  onClickThunk: PropTypes.func.isRequired,
};

export default connect(
  state => state,
  dispatch => ({
    onClick: () => randomize(dispatch),
    onClickThunk: () => thunkRandomize(dispatch),
  }),
)(ReduxComponent);
