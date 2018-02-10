import actionable from '../actionable';

describe('actionable', () => {
  test('should be a function and return a function', () => {
    expect(actionable).toEqual(expect.any(Function));
    expect(actionable()).toEqual(expect.any(Function));
  });

  describe('without path', () => {
    const state = { field: 1 };
    const actionObject = { type: 'some' };
    test('should result nextstate function', () => {
      const func = jest.fn(() => ({ field: 2 }));
      const nextState = actionable(func)(state, actionObject);
      expect(func).toHaveBeenCalledWith(state, actionObject);
      expect(nextState).toEqual({ field: 2 });
    });
  });

  describe('with path', () => {
    const state = { field: 1, safe: true };
    const path = 'field';
    const actionObject = { type: 'some' };
    test('should result nextstate function', () => {
      const func = jest.fn(() => 2);
      const nextState = actionable(func, path)(state, actionObject);
      expect(func).toHaveBeenCalledWith(state, actionObject);
      expect(nextState).toEqual({ safe: true, field: 2 });
    });
    test('should result nextstate function with fullstate', () => {
      const func = jest.fn(v => v);
      const nextState = actionable(func, path, false)(state, actionObject);
      expect(func).toHaveBeenCalledWith(1, actionObject);
      expect(nextState).toEqual({ field: 1, safe: true });
    });
  });
});
