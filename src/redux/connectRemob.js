import { registeredRemobs } from './combineRemob';
import inject from './inject';

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
    switch (typeof arg) {
      case 'string':
        key = arg;
        remob = registeredRemobs[key];
        break;
      default:
        break;
    }
    injectArgs[key] = remob;
  });
  return (connectRedux || defaultConnector)(...inject(injectArgs));
};

export default connectRemob;
