import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import simpleStore from '../store/simple/remob';
import inheritStore from '../store/inherit/remob';
import hardStore from '../store/hard/remob';
import Simple from '../component/Simple';
import Inherit from '../component/Inherit';
import { inject } from '../../src';

const RemobComponent = ({
  simple,
  inherit,
  hard,
}) => (
  <div>
    <Simple
      value={simple.field}
      valueDeep={simple.deep}
      onClick={simple.randomize}
      onClickThunk={simple.thunkRandomize}
      formattedValue={simple.formatValue}
      onClickDeep={simple.randomizeDeep}
    />
    <Inherit
      valueOne={inherit.fieldOne.field}
      valueTwo={inherit.fieldTwo.field}
      valueThree={inherit.fieldOne.deep.field}
      onClickOne={() => inherit.randomizePlusValue(1)}
      onClickTwo={inherit.fieldTwo.randomize}
      onClickThree={inherit.fieldOne.randomizeDeep}
    />
    <Inherit
      valueOne={hard.inherit.fieldOne.field}
      valueTwo={hard.inherit.fieldTwo.field}
      valueThree={hard.inherit.fieldOne.deep.field}
      onClickOne={hard.inherit.fieldOne.randomize}
      onClickTwo={hard.inherit.fieldTwo.randomize}
      onClickThree={hard.inherit.fieldOne.randomizeDeep}
    />
  </div>
);

RemobComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  inherit: PropTypes.shape({}).isRequired,
  hard: PropTypes.shape({}).isRequired,
};

export default connect(...inject({
  simple: simpleStore,
  inherit: inheritStore,
  hard: hardStore,
}))(RemobComponent);
