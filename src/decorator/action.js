import validation, { validateInstance } from './util/validation';
import actionable from './util/actionable';

const defaultDispatchable = method => (dispatch, options = {}, type = method) => dispatch({ ...options, type });

/**
 * action decorator
 * @method
 * @param  {Function|String|Undefined} field list or element what will be changed
 * @return {Function}       updated function with magical changes
 */
const actionAsFunction = (field, isFullState, dispatchable = defaultDispatchable) => (klass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  const boundFn = fn.bind(klass);
  validation(klass, fn, method, 'action');
  // actionable
  klass.registerAction(actionable(boundFn, field, isFullState), method);
  // dispatchable
  const propertyName = klass.getDispatchName(method);
  const property = dispatchable(propertyName, boundFn);
  klass.registerDispatch(property, method);
  return {
    configurable,
    enumerable,
    get: function get() {
      return property;
    },
  };
};

export default function action(...args) {
  // if called as @action
  if (validateInstance(...args)) {
    return actionAsFunction()(...args);
  }
  return actionAsFunction(...args);
}
