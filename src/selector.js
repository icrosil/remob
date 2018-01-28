import { validate } from './util/decorator';

export default (AppliedClass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  validate(fn, method, 'selector');
  AppliedClass.registerSelector(fn, method);
  return {
    configurable,
    enumerable,
    get: fn,
  };
};
