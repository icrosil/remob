import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import simpleStore from '../store/simple/remob';
import inheritStore from '../store/inherit/remob';
import Simple from '../component/Simple';
import Inherit from '../component/Inherit';
import { inject } from '../../src';

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
      onClickOne={inheritAction.fieldOne.randomize}
      onClickTwo={inheritAction.fieldTwo.randomize}
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
