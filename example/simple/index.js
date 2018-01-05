import { Reducer, action } from '../../src/';

export default class SimpleReducer extends Reducer {
  state = { field: 0 };
  @action('field') randomize = () => Math.random()
}
