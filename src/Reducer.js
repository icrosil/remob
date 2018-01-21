/* eslint no-param-reassign: 0 */

import _ from 'lodash';

import { actionable } from './action';

export default class Reducer {
  registerDispatches = (dispatches, path) => {
    if (typeof dispatches === 'function') {
      _.set(this, path, _.partialRight(dispatches, `${this.constructor.name}.${path}`));
    } else {
      _.set(this, path, {});
      _.each(dispatches, (fn, fnKey) => {
        this.registerDispatches(fn, `${path}.${fnKey}`);
      });
    }
  }
  // TODO probably prevPath is not good
  registerActions = (actions, path, prevPath = '') => {
    if (typeof actions === 'function') {
      _.set(this.actions, path, actionable(actions, prevPath, false));
    } else {
      _.set(this.actions, path, {});
      _.each(actions, (fn, fnKey) => {
        this.registerActions(fn, `${path}.${fnKey}`, path);
      });
    }
  }
  registerMixin = (mixin, mixinKey) => {
    const {
      actions, dispatches, initialState, selectors,
    } = mixin;
    this.initialState[mixinKey] = initialState;
    this.dispatches[mixinKey] = dispatches;
    this.selectors[mixinKey] = selectors;
    this.registerActions(actions, mixinKey);
    this.registerDispatches(dispatches, mixinKey);
  }
  getInitialState() {
    return this.initialState || {};
  }
  getActions() {
    return this.actions || {};
  }
  getDispatches() {
    return this.dispatches || {};
  }
  getSelectors() {
    return this.selectors || {};
  }
  // TODO make this fields not changable from outer world
  // TODO should it be here or in proto? describe somewhere why to do so and find another option
  // TODO describe how actions settled
  // TODO check do i need this state setter, would it be useful?
  // TODO do i need here to pass initialState?
  constructor() {
    this.actions = this.getActions();
    this.dispatches = this.getDispatches();
    this.initialState = this.getInitialState();
    this.selectors = this.getSelectors();
    _.each(this.initialState, (value, key) => {
      if (value instanceof Reducer) {
        this.registerMixin(value, key);
      }
    });
  }
  // TODO implementation
  // check every action in this instance and change state
  // TODO check how namespacing could be achieved
  // TODO bind reducer in constructor
  // TODO i guess we should make it static
  reducer = (state = this.initialState, action) => {
    console.log(action, 'action');
    // TODO refactor this
    // TODO all name management move somewhereto method
    const clearActionType = action.type.split(`${this.constructor.name}.`).pop();
    const callableAction = _.get(this.actions, clearActionType);
    // TODO investigate spacenaming issue
    // TODO investigate logic of using immer inside
    return callableAction ? callableAction(state, action) : state;
  };
}
