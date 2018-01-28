import { combineReducers } from 'redux';
import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';

import Reducer from './Reducer';

export default (remobs) => {
  const reducers = mapValues(remobs, (Remob) => {
    if (isObject(Remob) && Remob instanceof Reducer) return Remob.reducer;
    return Remob;
  });
  return combineReducers(reducers);
};
