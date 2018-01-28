import Reducer from '../Reducer';

export const validate = (klass, fn, method, decoratorType) => {
  if (!(klass instanceof Reducer)) {
    throw new SyntaxError(`${klass} should be instanceof Reducer`);
  }
  if (typeof fn !== 'function' || typeof method !== 'string') {
    throw new SyntaxError(`${decoratorType} decorator method ${method} is not a function.`);
  }
};

export default null;
