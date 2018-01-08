import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as MobXProvider } from 'mobx-react';

import store from '../store';

import ReduxContainer from './Redux';
import MobXContainer from './MobX';
import RemobContainer from './Remob';

export default () => (
  <div>
    <div>
      redux
      <ReduxProvider store={store.redux}>
        <ReduxContainer />
      </ReduxProvider>
    </div>
    <div>
      mobx
      <MobXProvider {...store.mobx}>
        <MobXContainer />
      </MobXProvider>
    </div>
    <div>
      remob
      <ReduxProvider store={store.remob}>
        <RemobContainer />
      </ReduxProvider>
    </div>
  </div>
);
