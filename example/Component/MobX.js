import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

@observer
class MobXComponent extends Component {
  render() {
    const { simple } = this.props;
    return (
      <div>
        {simple.field}
        <button onClick={simple.randomize}>randomize</button>
      </div>
    );
  }
}

MobXComponent.propTypes = {
  simple: PropTypes.shape({}).isRequired,
};

export default inject('simple')(MobXComponent);
