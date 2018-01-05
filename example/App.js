import React from 'react';
// redux
import { combineReducers, createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
// mobx
import { Provider as MobXProvider } from 'mobx-react';
// redux relative
import simpleRedux from './simple/redux';
import ReduxComponent from './ReduxComponent';
// mobx relative
import simpleMobx from './simple/mobx';
import MobXComponent from './MobXComponent';

const reduxStore = createStore(combineReducers({
  simple: simpleRedux,
}));

const mobxStore = {
  simple: simpleMobx,
};

export default () => (
  <div>
    <div>
      redux
      <ReduxProvider store={reduxStore}>
        <ReduxComponent />
      </ReduxProvider>
    </div>
    <div>
      mobx
      <MobXProvider {...mobxStore}>
        <MobXComponent />
      </MobXProvider>
    </div>
    <div>
      remob
    </div>
  </div>
);
