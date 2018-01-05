import { autobind } from 'core-decorators';
import { observable, action } from 'mobx';

@autobind
class RandomizeStore {
  @observable field = 0;
  @action randomize() {
    this.field = Math.random();
  }
}

export default new RandomizeStore();
