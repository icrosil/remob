import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import Simple from '../component/Simple';
import Inherit from '../component/Inherit';

@observer
class MobXComponent extends Component {
  render() {
    const { simple, inherit } = this.props;
    return (
      <div>
        <Simple
          value={simple.field}
          onClick={simple.randomize}
          onClickThunk={simple.thunkRandomize}
          formattedValue={simple.formatValue}
        />
        <Inherit
          valueOne={inherit.fieldOne}
          valueTwo={inherit.fieldTwo}
          onClickOne={inherit.randomizeOne}
          onClickTwo={inherit.randomizeTwo}
        />
      </div>
    );
  }
}

MobXComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
  inherit: PropTypes.shape({}).isRequired,
};

export default inject('simple', 'inherit')(MobXComponent);
