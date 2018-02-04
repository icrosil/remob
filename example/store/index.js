/* eslint-disable no-underscore-dangle */

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mapValues from 'lodash/mapValues';
import { combineRemob } from '../../src';

import * as simple from './simple';
import * as inherit from './inherit';
import * as hard from './hard';

const stores = {
  simple,
  inherit,
  hard,
};

const redux = mapValues(stores, store => (store.redux || (() => ({}))));
const mobx = mapValues(stores, 'mobx');
const remob = mapValues(stores, 'remob');

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createReduxStore = store => createStore(store, composeEnhancers(applyMiddleware(thunk)));

export default {
  remob: createReduxStore(combineRemob(remob)),
  redux: createReduxStore(combineReducers(redux)),
  mobx,
};
