// TODO make all static and use without new
export default class Reducer {
  // TODO make this fields not changable from outer world
  // TODO should it be here or in proto? describe somewhere why to do so and find another option
  // TODO describe how actions settled
  state = {};
  // TODO check do i need this state setter, would it be useful?
  constructor(initialState = this.state) {
    this.state = initialState;
  }
  // TODO implementation
  // check every action in this instance and change state
  // TODO check how namespacing could be achieved
  // TODO bind reducer in constructor
  // TODO i guess we should make it static
  reducer = (state = this.state, action) => {
    const callableAction = this.actions[action.type];
    // TODO investigate spacenaming issue
    // TODO investigate logic of using immer inside
    return callableAction ? callableAction(state, action) : state;
  };
}
