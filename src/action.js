/* eslint no-param-reassign: 0 */

import _ from 'lodash';
// TODO make dispatcher reassignable
// TODO add namespacing to dispatcher
// TODO pass value somehow
const dispatcher = method => (dispatch, type = method) => dispatch({ type });
// TODO find better name
// TODO add array usage if needed
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
export default (field, dispatcherToCall = dispatcher) => (AppliedClass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  if (typeof fn !== 'function' || typeof method !== 'string') {
    throw new SyntaxError(`action decorator method ${method} is not a function.`);
  }
  // TODO refactor this
  // TODO add this only for current class, don't pass it over as inherit
  const propertyName = _.camelCase(`${AppliedClass.constructor.name}_${method}`);
  // TODO describe why to do so and find easier option
  // TODO check is this way is good enough
  // TODO have static class in reducer to listen/subscribe
  AppliedClass.actions = AppliedClass.actions || {};
  AppliedClass.actions[method] = actioner(fn, field);
  const property = dispatcherToCall(propertyName, fn);
  AppliedClass.dispatches = AppliedClass.dispatches || {};
  AppliedClass.dispatches[method] = property;
  return {
    configurable,
    enumerable,
    get: function get() {
      return property;
    },
  };
};
