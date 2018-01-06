/* eslint no-param-reassign: 0 */
// TODO make dispatcher reassignable
// TODO add namespacing to dispatcher
// TODO pass value somehow
const dispatcher = method => dispatch => dispatch({ type: method });
// TODO find better name
// TODO add array usage if needed
const actioner = (func, field) => {
  if (typeof field === 'string') {
    return (state, action) => ({
      ...state,
      [field]: func(state, action),
    });
  }
  return (state, action) => func(state, action);
};

// TODO save somehow inner properties of Reducer that should not be changed
// TODO make reducer to answer that exact namespaced action and run originalMethod
// TODO make @action and @action() to work equal
// TODO use core-decorators example as good practice for naming etc
/**
 * action decorator
 * @method
 * @param  {String|Undefined} field list or element what will be changed
 * @return {Function}       updated function with magical changes
 */
export default field => (AppliedClass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  if (typeof fn !== 'function' || typeof method !== 'string') {
    throw new SyntaxError(`action decorator method ${method} is not a function.`);
  }
  // TODO describe why to do so and find easier option
  // TODO check is this way is good enough
  AppliedClass.actions = AppliedClass.actions || {};
  AppliedClass.actions[method] = actioner(fn, field);
  const property = dispatcher(method);
  return {
    configurable,
    enumerable,
    get: function get() {
      return property;
    },
  };
};
