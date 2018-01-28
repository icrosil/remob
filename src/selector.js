import { validate } from './util/decorator';

export default (klass, method, _ref) => {
  const { value: fn, configurable, enumerable } = _ref;
  validate(klass, fn, method, 'selector');
  klass.registerSelector(fn, method);
  return {
    configurable,
    enumerable,
    get: fn,
  };
};
