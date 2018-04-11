import { validate } from './util/decorator';
import actionable from './util/actionable';

const defaultDispatchable = method => (dispatch, options = {}, type = method) => dispatch({ ...options, type });

/**
 * action decorator
 * @method
 * @param  {String|Undefined} field list or element what will be changed
 * @return {Function}       updated function with magical changes
 */
export default (field, isFullState, dispatchable = defaultDispatchable) => (klass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  const boundFn = fn.bind(klass);
  validate(klass, fn, method, 'action');
  klass.registerAction(actionable(boundFn, field, isFullState), method);
  const property = klass.registerDispatch(boundFn, method, dispatchable);
  return {
    configurable,
    enumerable,
    get: function get() {
      return property;
    },
  };
};
