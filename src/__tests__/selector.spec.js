import selector from '../selector';
import { validate } from '../util/decorator';
import Reducer from '../Reducer';

jest.mock('../util/decorator', () => ({
  validate: jest.fn(() => {
    const error = { value: 'issue' };
    throw error;
  }),
}));

jest.mock('../Reducer', () => class ClassName {
  ['registerSelector'] = jest.fn();
});

describe('selector', () => {
  const instance = new Reducer();
  const ref = {
    value: jest.fn(),
  };

  test('should be a function', () => {
    expect(selector).toEqual(expect.any(Function));
  });

  test('should call decorator validation', () => {
    try {
      selector(Reducer, 'method', ref);
    } catch (e) {
      expect(validate).toHaveBeenCalledWith(Reducer, ref.value, 'method', 'selector');
    }
  });

  test('should registrate everything', () => {
    validate.mockReset();
    const result = selector(instance, 'method', ref);
    expect(instance.registerSelector).toHaveBeenCalledWith(expect.any(Function), 'method');
    expect(result).toEqual({
      configurable: undefined,
      enumerable: undefined,
      get: expect.any(Function),
    });
  });
});
