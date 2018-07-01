import { combineReducers } from 'redux';
import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';

import Reducer from './Reducer';

export const registeredRemobs = {};

const isRemobNameValid = name => !registeredRemobs[name];

/**
 * combineRemob gathers reducers from simple reducers and remobs
 * @method
 * @param  {Object} remobs stores
 */
export default (remobs) => {
  const reducers = mapValues(remobs, (Remob, remobName) => {
    if (isObject(Remob) && Remob instanceof Reducer) {
      const { name } = Remob.constructor;
      const registeredName = isRemobNameValid(name) ? name : remobName;
      if (registeredRemobs[registeredName]) {
        throw new Error(`remob ${registeredName} already registered, for safety reasons pls use another name`);
      }
      registeredRemobs[registeredName] = Remob;
      return Remob.reducer;
    }
    return Remob;
  });
  return combineReducers(reducers);
};
