import thunk from '../thunk';
import action from '../action';

jest.mock('../action', () => jest.fn(() => () => {}));

describe('thunk', () => {
  test('should be a function', () => {
    expect(thunk).toEqual(expect.any(Function));
  });

  test('should call action on init', () => {
    expect(action).toHaveBeenCalledWith(undefined, expect.any(Function));
  });
});
