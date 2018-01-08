import { Reducer, action } from '../../../src/';

class SimpleReducer extends Reducer {
  state = { field: 0 };
  @action('field') randomize() {
    return Math.random();
  }
}

export default new SimpleReducer();
