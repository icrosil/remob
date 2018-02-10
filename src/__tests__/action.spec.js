import action from '../action';
import { validate } from '../util/decorator';
import Reducer from '../Reducer';

jest.mock('../util/decorator', () => ({
  validate: jest.fn(() => {
    const error = { value: 'issue' };
    throw error;
  }),
}));

jest.mock('../Reducer', () => class ClassName {
  ['registerAction'] = jest.fn();
  ['registerDispatch'] = jest.fn(() => () => {});
});

describe('action', () => {
  const instance = new Reducer();
  const ref = {
    value: jest.fn(),
  };
  const field = 'some';

  test('should be a function and return a function', () => {
    expect(action).toEqual(expect.any(Function));
    expect(action()).toEqual(expect.any(Function));
  });

  test('should call decorator validation', () => {
    try {
      action(field)(Reducer, 'method', ref);
    } catch (e) {
      expect(validate).toHaveBeenCalledWith(Reducer, ref.value, 'method', 'action');
    }
  });

  test('should registrate everything', () => {
    validate.mockReset();
    const result = action(field)(instance, 'method', ref);
    expect(instance.registerAction).toHaveBeenCalledWith(expect.any(Function), 'method');
    expect(instance.registerDispatch).toHaveBeenCalledWith(expect.any(Function), 'method', expect.any(Function));
    expect(result).toEqual({
      configurable: undefined,
      enumerable: undefined,
      get: expect.any(Function),
    });
    expect(result.get()).toEqual(expect.any(Function));
  });
});
