import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { randomize } from '../store/simple/redux';

const ReduxComponent = ({ simple, dispatch }) => (
  <div>
    {simple && simple.field}
    <button onClick={() => randomize(dispatch)}>randomize</button>
  </div>
);

ReduxComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => state)(ReduxComponent);
