import findKey from 'lodash/findKey';
import isObject from 'lodash/isObject';

import { registeredRemobs } from './combineRemob';
import inject from './inject';
import Reducer from './Reducer';

const defaultConnector = () => {
  throw new Error('You forgot to specify connector to redux');
};

let connectRedux;

export const setConnector = (connect) => {
  connectRedux = connect;
};

const connectRemob = (...args) => {
  const injectArgs = {};
  args.forEach((arg) => {
    let key;
    let remob;
    if (typeof arg === 'string') {
      key = arg;
      remob = registeredRemobs[key];
    } else if (arg instanceof Reducer) {
      key = findKey(registeredRemobs, arg);
      remob = arg;
    } else if (isObject(arg)) {
      const entries = Object.entries(arg);
      entries.forEach(([entryKey, entryValue]) => {
        injectArgs[entryKey] = entryValue;
      });
      return;
    }
    injectArgs[key] = remob;
  });
  return (connectRedux || defaultConnector)(...inject(injectArgs));
};

export default connectRemob;
