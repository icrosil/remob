/* eslint no-param-reassign: 0 */

// TODO make dispatcher reassignable
// TODO add namespacing to dispatcher
// TODO pass value somehow
const dispatcher = method => (dispatch, type = method) => dispatch({ type });
// TODO find better name
export const actioner = (func, field, isFullStatePassed = true) => {
  if (typeof field === 'string') {
    return (state, action) => ({
      ...state,
      [field]: func(isFullStatePassed ? state : state[field], action),
    });
  }
  return (state, action) => func(state, action);
};

// TODO save somehow inner properties of Reducer that should not be changed
// TODO make reducer to answer that exact namespaced action and run originalMethod
// TODO make @action and @action() to work equal
// TODO use core-decorators example as good practice for naming etc
// TODO think about move out logic of this decorator and let action be like thunk
/**
 * action decorator
 * @method
 * @param  {String|Undefined} field list or element what will be changed
 * @return {Function}       updated function with magical changes
 */
// TODO rename dispatcherToCall
export default (field, dispatcherToCall = dispatcher) => (klass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  const boundFn = fn.bind(klass);
  if (typeof fn !== 'function' || typeof method !== 'string') {
    throw new SyntaxError(`action decorator method ${method} is not a function.`);
  }
  // TODO refactor this
  // TODO add this only for current class, don't pass it over as inherit
  // TODO check if Applied class is reducer
  const propertyName = klass.getActionName(klass, method);
  // TODO describe why to do so and find easier option
  // TODO check is this way is good enough
  // TODO have static class in reducer to listen/subscribe
  klass.actions = klass.getActions();
  klass.actions[method] = actioner(boundFn, field);
  const property = dispatcherToCall(propertyName, boundFn);
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
