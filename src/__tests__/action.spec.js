import action, { actionable } from '../action';
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

  describe('itself', () => {
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
});
