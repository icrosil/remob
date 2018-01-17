import { combineReducers } from 'redux';
import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';

import Reducer from './Reducer';

export default (remobs) => {
  // TODO move this description somewhere appropriate
  // remob could be an class or an instance
  // class could have initial state as state member
  // or reset it by first param to constructor
  // this is for letting create remob as single or
  // reuse class somewhere else as part of remob (HOR)
  // and reset state easily
  const reducers = mapValues(remobs, (Remob) => {
    if (isObject(Remob) && Remob instanceof Reducer) return Remob.reducer;
    return Remob;
  });
  return combineReducers(reducers);
};
