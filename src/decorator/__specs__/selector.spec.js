import selector from '../selector';
import validation from '../util/validation';
import Reducer from '../../redux/Reducer';

jest.mock('../util/validation', () => jest.fn(() => {
  const error = { value: 'issue' };
  throw error;
}));

jest.mock('../../redux/Reducer');

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
      expect(validation).toHaveBeenCalledWith(Reducer, ref.value, 'method', 'selector');
    }
  });

  test('should registrate everything', () => {
    validation.mockReset();
    const result = selector(instance, 'method', ref);
    expect(instance.registerSelector).toHaveBeenCalledWith(expect.any(Function), 'method');
    expect(result).toEqual({
      configurable: undefined,
      enumerable: undefined,
      get: expect.any(Function),
    });
  });
});
