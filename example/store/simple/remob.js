import { Reducer, action, selector, thunk } from '../../../src/';

class SimpleReducer extends Reducer {
  initialState = {
    field: 0,
    deep: {
      field: 42,
    },
  };
  @action shuffleReducer() {
    return {
      field: Math.random(),
      deep: {
        field: Math.random(),
      },
    };
  }
  @action('field') randomize() {
    return Math.random();
  }
  @action('deep.field') randomizeDeep() {
    return Math.random();
  }
  @thunk thunkRandomize(dispatch) {
    this.randomize(dispatch);
  }
  @selector formatValue(state) {
    return state.field + 1;
  }
}

export default new SimpleReducer();
