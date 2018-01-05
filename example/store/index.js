import { combineReducers, createStore } from 'redux';
import mapValues from 'lodash/mapValues';

import * as simple from './simple';

const stores = {
  simple,
};

const redux = mapValues(stores, 'redux');
const mobx = mapValues(stores, 'mobx');
const remob = mapValues(stores, 'remob');

export default {
  remob,
  redux: createStore(combineReducers(redux)),
  mobx,
};
