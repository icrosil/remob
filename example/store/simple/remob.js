import { Reducer, action, selector, thunk } from '../../../src/';

class SimpleReducer extends Reducer {
  initialState = { field: 0 };
  @action('field') randomize() {
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
