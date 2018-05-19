import { Reducer } from '../../../src/';
import inherit from '../inherit/remob';

class HardRandomizer extends Reducer {
  getInitialState() {
    return {
      inherit,
    };
  }
}

const instance = new HardRandomizer();

instance.debug();

export default instance;
