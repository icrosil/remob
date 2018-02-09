import Reducer from '../Reducer';

/**
 * validator for correct decorator usage
 * @method validate
 * @param  {Object}   klass         instance of where decorator was used
 * @param  {Function} fn            method where decorator was used
 * @param  {String}   method        name of method in instance
 * @param  {String}   decoratorType what type pf decorator called this
 */
export const validate = (klass, fn, method, decoratorType) => {
  if (!(klass instanceof Reducer)) {
    throw new SyntaxError(`${klass} should be instanceof Reducer`);
  }
  if (typeof fn !== 'function' || typeof method !== 'string') {
    throw new SyntaxError(`${decoratorType} decorator method ${method} is not a function.`);
  }
};

export default null;
