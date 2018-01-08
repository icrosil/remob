import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

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
          formattedValue={simple.formatValue}
        />
      </div>
    );
  }
}

MobXComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
};

export default inject('simple')(MobXComponent);
