import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mapValues from 'lodash/mapValues';
import { combineRemob } from '../../src';

import * as simple from './simple';

const stores = {
  simple,
};

const redux = mapValues(stores, 'redux');
const mobx = mapValues(stores, 'mobx');
const remob = mapValues(stores, 'remob');

const createReduxStore = store => createStore(store, compose(applyMiddleware(thunk)));

export default {
  remob: createReduxStore(combineRemob(remob)),
  redux: createReduxStore(combineReducers(redux)),
  mobx,
};
