import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ReduxComponent = ({ simple }) => (
  <div>
    {simple.field}
  </div>
);

ReduxComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
};

export default connect(state => state)(ReduxComponent);
