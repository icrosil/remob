import action from '../action';
import validation from '../util/validation';
import Reducer from '../../redux/Reducer';

jest.mock('../util/validation', () => jest.fn(() => {
  const error = { value: 'issue' };
  throw error;
}));

jest.mock('../../redux/Reducer', () => class ClassName {
  ['registerAction'] = jest.fn();
  ['registerDispatch'] = jest.fn(() => () => {});
  ['getDispatchName'] = jest.fn(() => () => {});
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
      expect(validation).toHaveBeenCalledWith(Reducer, ref.value, 'method', 'action');
    }
  });

  test('should registrate everything', () => {
    validation.mockReset();
    const result = action(field)(instance, 'method', ref);
    expect(instance.registerAction).toHaveBeenCalledWith(expect.any(Function), 'method');
    expect(instance.registerDispatch).toHaveBeenCalledWith(expect.any(Function), 'method');
    expect(result).toEqual({
      configurable: undefined,
      enumerable: undefined,
      get: expect.any(Function),
    });
    expect(result.get()).toEqual(expect.any(Function));
  });
});
