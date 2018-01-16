import { Reducer } from '../../../src/';
import simple from '../simple/remob';

class InheritRandomizer extends Reducer {
  // TODO find better way to pass HORs
  getInitialState() {
    return {
      fieldOne: simple,
      fieldTwo: simple,
    };
  }
}

export default new InheritRandomizer();
