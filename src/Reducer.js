/* eslint no-param-reassign: 0 */

import _ from 'lodash';

import { actioner } from './action';

// TODO make all static and use without new
export default class Reducer {
  getActionName(klass, methodName) {
    return `${klass.constructor.name}.${methodName}`;
  }
  getInitialState() {
    return this.initialState || {};
  }
  // TODO probably somehow refactor this to have consistent with state
  getActions() {
    return this.actions || {};
  }
  // TODO probably somehow refactor this to have consistent with state
  getDispatches() {
    return this.dispatches || {};
  }
  // TODO probably somehow refactor this to have consistent with state
  getSelectors() {
    return this.selectors || {};
  }
  // TODO make this fields not changable from outer world
  // TODO should it be here or in proto? describe somewhere why to do so and find another option
  // TODO describe how actions settled
  // TODO check do i need this state setter, would it be useful?
  // TODO do i need here to pass initialState?
  constructor() {
    // TODO split this big loginc into parts
    // TODO add to every action/dispatch -> name of current store to set uniq
    const initialState = this.getInitialState();
    const actions = this.getActions();
    const dispatches = this.getDispatches();
    const selectors = this.getSelectors();
    // TODO find better way than getInitialState
    // TODO better mixinLogic
    // TODO fix namings
    // TODO try to have actions as mixin/action not total camelCase
    const mixins = _.pickBy(initialState, value => value instanceof Reducer);
    const mixinsValues = _.mapValues(mixins, 'initialState');
    const mixinsActions = _.reduce(mixins, (result, mixin, mixinKey) => {
      const { actions: mixinActions } = mixin;
      const updatedActions = _.mapValues(mixinActions, action => actioner(action, mixinKey, false));
      return {
        ...result,
        [mixinKey]: updatedActions,
      };
    }, {});
    const mixinsDispatches = _.reduce(mixins, (result, mixin, mixinKey) => {
      const { dispatches: mixinDispatches } = mixin;
      return {
        ...result,
        [mixinKey]: mixinDispatches,
      };
    }, {});
    const mixinsSelectors = _.reduce(mixins, (result, mixin, mixinKey) => {
      const { selectors: mixinSelectors } = mixin;
      return {
        ...result,
        [mixinKey]: mixinSelectors,
      };
    }, {});
    this.initialState = {
      ...initialState,
      ...mixinsValues,
    };
    this.actions = {
      ...actions,
      ...mixinsActions,
    };
    // TODO map actions to current state
    this.dispatches = {
      ...dispatches,
      ...mixinsDispatches,
    };
    // TODO what if 3 inherit?
    _.each(mixinsDispatches, (mixin, key) => {
      this[key] = {};
      _.each(mixin, (fn, mixinKey) => {
        this[key][mixinKey] = _.partialRight(fn, `${this.constructor.name}.${key}.${mixinKey}`);
      });
    });
    this.selectors = {
      ...selectors,
      ...mixinsSelectors,
    };
  }
  // TODO implementation
  // check every action in this instance and change state
  // TODO check how namespacing could be achieved
  // TODO bind reducer in constructor
  // TODO i guess we should make it static
  reducer = (state = this.initialState, action) => {
    console.log(action, 'action');
    // TODO refactor this
    const clearActionType = action.type.split(`${this.constructor.name}.`).pop();
    const callableAction = _.get(this.actions, clearActionType);
    // TODO investigate spacenaming issue
    // TODO investigate logic of using immer inside
    return callableAction ? callableAction(state, action) : state;
  };
}
