/* eslint no-param-reassign: 0 */

// TODO think about determining do you need to pass this state or whole state tree
// TODO 1 param - this state, 2 param - all states
export default (AppliedClass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  if (typeof fn !== 'function' || typeof method !== 'string') {
    throw new SyntaxError(`selector decorator method ${method} is not a function.`);
  }
  AppliedClass.selectors = AppliedClass.selectors || {};
  // TODO think about having add method here, or should it be only array with methodNames
  AppliedClass.selectors[method] = fn;
  return {
    configurable,
    enumerable,
    get: fn,
  };
};
