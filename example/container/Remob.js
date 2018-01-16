import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// TODO investigate how to pass actions from store without importing
import simpleStore from '../store/simple/remob';
import inheritStore from '../store/inherit/remob';
import Simple from '../component/Simple';
import Inherit from '../component/Inherit';
import { inject } from '../../src';

// TODO investigate how to combine simple and simpleAction
const RemobComponent = ({
  simple,
  simpleAction,
  inherit,
  inheritAction,
}) => (
  <div>
    <Simple
      value={simple.field}
      onClick={simpleAction.randomize}
      onClickThunk={simpleAction.thunkRandomize}
      formattedValue={simple.formatValue}
    />
    <Inherit
      valueOne={inherit.fieldOne.field}
      valueTwo={inherit.fieldTwo.field}
      onClickOne={inheritAction.fieldOneRandomize}
      onClickTwo={inheritAction.fieldTwoRandomize}
    />
  </div>
);

RemobComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  simpleAction: PropTypes.shape({}).isRequired,
  inherit: PropTypes.shape({}).isRequired,
  inheritAction: PropTypes.shape({}).isRequired,
};

export default connect(...inject({ simple: simpleStore, inherit: inheritStore }))(RemobComponent);
