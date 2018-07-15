import * as remob from '.';

describe('index', () => {
  test('should export all features', () => {
    expect(remob).toHaveProperty('action');
    expect(remob).toHaveProperty('combineRemob');
    expect(remob).toHaveProperty('inject');
    expect(remob).toHaveProperty('Reducer');
    expect(remob).toHaveProperty('selector');
    expect(remob).toHaveProperty('thunk');
    expect(remob).toHaveProperty('connectRemob');
    expect(remob).toHaveProperty('setConnector');
    expect(remob).toHaveProperty('setCombiner');
  });
});
