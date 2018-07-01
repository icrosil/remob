import findKey from 'lodash/findKey';

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
    }
    injectArgs[key] = remob;
  });
  return (connectRedux || defaultConnector)(...inject(injectArgs));
};

export default connectRemob;
