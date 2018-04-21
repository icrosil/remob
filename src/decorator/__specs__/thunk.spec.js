import thunk from '../thunk';
import action from '../action';

jest.mock('../action', () => jest.fn((method, isFullState, dispatch) => () => dispatch));

describe('thunk', () => {
  test('should be a function', () => {
    expect(thunk).toEqual(expect.any(Function));
  });

  test('should call action on init', () => {
    expect(action).toHaveBeenCalledWith(undefined, undefined, expect.any(Function));
  });

  describe('dispatcher', () => {
    test('should be a function with 2 params', () => {
      const dispatch = thunk();
      expect(dispatch).toEqual(expect.any(Function));
      expect(dispatch).toHaveLength(2);
    });
    test('should pass 2 param into dispatch', () => {
      const dispatch = jest.fn();
      const dispatchable = thunk()(1, 2);
      expect(dispatchable).toEqual(expect.any(Function));
      expect(dispatchable).toHaveLength(1);
      dispatchable(dispatch);
      expect(dispatch).toHaveBeenCalledWith(2);
    });
  });
});
