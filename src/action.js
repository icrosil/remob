import { validate } from './util/decorator';

const defaultDispatchable = method => (dispatch, options = {}, type = method) => dispatch({ ...options, type });

export const actionable = (func, path, isFullStatePassed = true) => {
  if (typeof path === 'string') {
    return (state, action) => {
      const updatedState = { ...state };
      const partPath = path.split('.').shift();
      return {
        ...state,
        [partPath]: func(isFullStatePassed ? updatedState : state[partPath], action),
      };
    };
  }
  return (state, action) => func(state, action);
};

/**
 * action decorator
 * @method
 * @param  {String|Undefined} field list or element what will be changed
 * @return {Function}       updated function with magical changes
 */
export default (field, dispatchable = defaultDispatchable) => (klass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  const boundFn = fn.bind(klass);
  validate(klass, fn, method, 'action');
  klass.registerAction(actionable(boundFn, field), method);
  const property = klass.registerDispatch(boundFn, method, dispatchable);
  return {
    configurable,
    enumerable,
    get: function get() {
      return property;
    },
  };
};
