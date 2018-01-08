import { Reducer, action, selector } from '../../../src/';

class SimpleReducer extends Reducer {
  state = { field: 0 };
  @action('field') randomize() {
    return Math.random();
  }
  @selector formatValue(state) {
    return state.field + 1;
  }
}

export default new SimpleReducer();
