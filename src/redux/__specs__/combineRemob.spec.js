import combineRemob, { setCombiner } from '../combineRemob';
import { Reducer } from '../..';

describe('combineRemob', () => {
  const instance = new Reducer();
  test('should be a function', () => {
    expect(combineRemob).toEqual(expect.any(Function));
    expect(setCombiner).toEqual(expect.any(Function));
  });
  describe('withoutCombiner', () => {
    it('should fail', () => {
      expect(() => combineRemob({ instance })).toThrow();
    });
  });
  describe('withCombiner', () => {
    const combiner = jest.fn();
    beforeEach(() => {
      setCombiner(combiner);
    });
    test('should map all remobs and call combineReducers', () => {
      combineRemob({ instance1: instance, notRemob: () => {} });
      expect(combiner).toHaveBeenCalled();
    });
    test('should throw if remob names duplicating', () => {
      expect(() => {
        combineRemob({ instance, instance2: instance });
      }).toThrow();
    });
  });
});
