import { Reducer } from '../../../src/';
import inherit from '../inherit/remob';

class HardRandomizer extends Reducer {
  getInitialState() {
    return {
      inherit,
    };
  }
}

export default new HardRandomizer();
