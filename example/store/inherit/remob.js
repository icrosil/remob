import { Reducer, action } from '../../../src/';
import simple from '../simple/remob';

class InheritRandomizer extends Reducer {
  @action('fieldOne', false) randomizePlusValue(state, { value }) {
    return {
      ...state,
      field: value + Math.random(),
    };
  }
  getInitialState() {
    return {
      fieldOne: simple,
      fieldTwo: simple,
    };
  }
}

export default new InheritRandomizer();
