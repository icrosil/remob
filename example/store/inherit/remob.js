import { Reducer } from '../../../src/';
import simple from '../simple/remob';

class InheritRandomizer extends Reducer {
  getInitialState() {
    return {
      fieldOne: simple,
      fieldTwo: simple,
    };
  }
}

export default new InheritRandomizer();
