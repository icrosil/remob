/* eslint no-param-reassign: 0 */

// TODO probably move out this somewhere
const defaultDispatchable = method => (dispatch, type = method, options = {}) => dispatch({ ...options, type });
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

// TODO make @action and @action() to work equal
// TODO use core-decorators example as good practice for naming etc
/**
 * action decorator
 * @method
 * @param  {String|Undefined} field list or element what will be changed
 * @return {Function}       updated function with magical changes
 */
export default (field, dispatchable = defaultDispatchable) => (klass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  const boundFn = fn.bind(klass);
  if (typeof fn !== 'function' || typeof method !== 'string') {
    throw new SyntaxError(`action decorator method ${method} is not a function.`);
  }
  // TODO check if Applied class is reducer
  // TODO check can i use this here ?
  const propertyName = `${klass.constructor.name}.${method}`;
  // TODO describe why to do so and find easier option
  // TODO check is this way is good enough
  klass.actions = klass.getActions();
  klass.actions[method] = actionable(boundFn, field);
  const property = dispatchable(propertyName, boundFn);
  klass.dispatches = klass.getDispatches();
  klass.dispatches[method] = property;
  return {
    configurable,
    enumerable,
    get: function get() {
      return property;
    },
  };
};
