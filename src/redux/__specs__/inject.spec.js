import {
  inject, action, Reducer, selector,
} from '../..';

describe('inject', () => {
  const mockConnect = (mapState, mapDispatch, mapMerge) => {
    const dispatch = jest.fn();
    const state = {
      instance: {
        field: 1,
      },
    };
    const mappedState = mapState(state);
    const mappedDispatch = mapDispatch(dispatch);
    const mappedMerge = mapMerge(mappedState, mappedDispatch);
    return mappedMerge;
  };
  class RealReducer extends Reducer {
    initialState = {
      field: 1,
    }

    @action('field') setTwo() {
      return 2;
    }

    @selector getOne() {
      return 11;
    }
  }
  const instance = new RealReducer();
  test('should be a function', () => {
    expect(inject).toEqual(expect.any(Function));
  });
  test('should return array of 3', () => {
    const result = inject({ instance });
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);
  });
  test('should be dispatchable and statable', () => {
    const injected = inject({ instance });
    const connected = mockConnect(...injected);
    expect(connected.instance).toMatchObject({
      getOne: 11,
      setTwo: expect.any(Function),
      field: 1,
    });
  });
});
