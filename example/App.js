import React from 'react';
// redux
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

// redux relative
import simpleRedux from './simple/redux';
import ReduxComponent from './ReduxComponent';

const reduxStore = createStore(combineReducers({
  simple: simpleRedux,
}));

export default () => (
  <div>
    <div>
      redux
      <Provider store={reduxStore}>
        <ReduxComponent />
      </Provider>
    </div>
    <div>
      mobx
    </div>
    <div>
      remob
    </div>
  </div>
);
