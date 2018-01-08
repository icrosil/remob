import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as MobXProvider } from 'mobx-react';

import store from '../store';

import ReduxComponent from './Redux';
import MobXComponent from './MobX';
import RemobComponent from './Remob';

export default () => (
  <div>
    <div>
      redux
      <ReduxProvider store={store.redux}>
        <ReduxComponent />
      </ReduxProvider>
    </div>
    <div>
      mobx
      <MobXProvider {...store.mobx}>
        <MobXComponent />
      </MobXProvider>
    </div>
    <div>
      remob
      <ReduxProvider store={store.remob}>
        <RemobComponent />
      </ReduxProvider>
    </div>
  </div>
);
