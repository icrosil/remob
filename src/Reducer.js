export default class Reducer {
  state = {};
  constructor(initialState = this.state) {
    this.state = initialState;
  }
  // TODO implementation
  // check every action in this instance and change state
  // TODO check how namespacing could be achieved
  // TODO bind reducer in constructor
  reducer = (state = this.state) => state;
}
