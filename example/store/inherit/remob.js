import { Reducer, action } from '../../../src/';
import simple from '../simple/remob';

class InheritRandomizer extends Reducer {
  @action('fieldOne') randomizePlusValue(state, { value }) {
    return {
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
