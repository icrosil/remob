import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// TODO investigate how to pass actions from store without importing
import remob from '../store/simple/remob';
import Simple from '../component/Simple';

const ReduxComponent = ({ simple, onClick }) => (
  <div>
    <Simple value={simple.field} onClick={onClick} />
  </div>
);

ReduxComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
};

// TODO probably another connect (remob connector as user of another connector)
// TODO investigate how to pass dispatch to needed/all actions from one/multiple stores
export default connect(
  state => state,
  dispatch => ({
    onClick: () => remob.randomize(dispatch),
  }),
)(ReduxComponent);
