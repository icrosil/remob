import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// TODO investigate how to pass actions from store without importing
import simpleStore from '../store/simple/remob';
import Simple from '../component/Simple';
import { inject } from '../../src';

// TODO investigate how to combine simple and simpleAction
const RemobComponent = ({ simple, simpleAction }) => (
  <div>
    <Simple
      value={simple.field}
      onClick={simpleAction.randomize}
      onClickThunk={simpleAction.thunkRandomize}
      formattedValue={simple.formatValue}
    />
  </div>
);

RemobComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  simpleAction: PropTypes.shape({}).isRequired,
};

export default connect(...inject({ simple: simpleStore }))(RemobComponent);
