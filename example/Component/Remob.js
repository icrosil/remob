import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ReduxComponent = ({ simple }) => (
  <div>
    {simple && simple.field}
  </div>
);

ReduxComponent.propTypes = {
  simple: PropTypes.shape({}),
};

ReduxComponent.defaultProps = {
  simple: {},
};

export default connect(state => state)(ReduxComponent);
