import validation from './util/validation';

/**
 * selector decorator to create mappers from state
 * @method
 * @param  {Object} klass  instance of applied Class
 * @param  {String} method name of applied property
 * @param  {Object} _ref   pure property
 * @return {Object}        updated property
 */
export default (klass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  validation(klass, fn, method, 'selector');
  klass.registerSelector(fn, method);
  return {
    configurable,
    enumerable,
    get: fn,
  };
};
