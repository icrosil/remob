import { autobind } from 'core-decorators';
import { observable, action, computed } from 'mobx';

@autobind
class RandomizeStore {
  @observable field = 0;
  @action randomize() {
    this.field = Math.random();
  }
  @computed get formatValue() {
    return this.field + 1;
  }
}

export default new RandomizeStore();
