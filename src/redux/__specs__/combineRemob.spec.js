import { combineReducers } from 'redux';
import { Reducer, combineRemob } from '../../';

jest.mock('redux', () => ({
  combineReducers: jest.fn(),
}));

describe('combineRemob', () => {
  const instance = new Reducer();
  test('should be a function', () => {
    expect(combineRemob).toEqual(expect.any(Function));
  });
  test('should map all remobs and call combineReducers', () => {
    combineRemob({ instance, notRemob: () => {} });
    expect(combineReducers).toHaveBeenCalled();
  });
});
