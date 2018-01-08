import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Simple from '../component/Simple';
import { randomize, formatValue } from '../store/simple/redux';

const ReduxComponent = ({ simple, onClick }) => (
  <div>
    <Simple
      value={simple.field}
      formattedValue={formatValue(simple.field)}
      onClick={onClick}
    />
  </div>
);

ReduxComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(
  state => state,
  dispatch => ({
    onClick: () => randomize(dispatch),
  }),
)(ReduxComponent);
