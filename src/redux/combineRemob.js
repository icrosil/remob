import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';

import Reducer from './Reducer';

export const registeredRemobs = {};

const defaultCombiner = () => {
  throw new Error('You forgot to combineReducers');
};

let combineReducers;

export const setCombiner = (combiner) => {
  combineReducers = combiner;
};

/**
 * combineRemob gathers reducers from simple reducers and remobs
 * @method
 * @param  {Object} remobs stores
 */
export default (remobs) => {
  const reducers = mapValues(remobs, (Remob, remobName) => {
    if (isObject(Remob) && Remob instanceof Reducer) {
      if (registeredRemobs[remobName]) {
        throw new Error(`remob ${remobName} already registered, for safety reasons pls use another name`);
      }
      registeredRemobs[remobName] = Remob;
      return Remob.reducer;
    }
    return Remob;
  });
  return (combineReducers || defaultCombiner)(reducers);
};
