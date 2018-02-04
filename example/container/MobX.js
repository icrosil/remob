/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Simple from '../component/Simple';

@observer
class MobXComponent extends Component {
  render() {
    const { simple } = this.props;
    return (
      <div>
        <Simple
          value={simple.field}
          onClick={simple.randomize}
          onClickThunk={simple.thunkRandomize}
          formattedValue={simple.formatValue}
        />
        <DevTools />
      </div>
    );
  }
}

MobXComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
};

export default inject('simple')(MobXComponent);
