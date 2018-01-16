// TODO make this example as HOR from simple

import { autobind } from 'core-decorators';
import { observable, action } from 'mobx';

@autobind
class RandomizeStore {
  @observable fieldOne = 0;
  @observable fieldTwo = 0;
  @action randomizeOne() {
    this.fieldOne = Math.random();
  }
  @action randomizeTwo() {
    this.fieldTwo = Math.random();
  }
}

export default new RandomizeStore();
