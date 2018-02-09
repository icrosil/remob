import _ from 'lodash';

import { actionable } from './action';

/**
 * Reducer class to create reducers,
 * has method to register actions/dispatches/selectors.
 * works with namings and mixins.
 * contains reducer implementation which resolves registered actions.
 * @type {Reducer}
 */
export default class Reducer {
  registerAction(fn, method) {
    this.actions = this.getActions();
    this.actions[method] = fn;
  }
  registerDispatch(fn, method, dispatchable) {
    const propertyName = this.getDispatchName(method);
    const property = dispatchable(propertyName, fn);
    this.dispatches = this.getDispatches();
    this.dispatches[method] = property;
    return property;
  }
  registerSelector(fn, method) {
    this.selectors = this.getSelectors();
    this.selectors[method] = fn;
  }
  registerDispatches = (dispatches, path) => {
    if (typeof dispatches === 'function') {
      _.set(this, path, _.partialRight(dispatches, this.getDispatchName(path)));
    } else {
      _.set(this, path, {});
      _.each(dispatches, (fn, fnKey) => {
        this.registerDispatches(fn, Reducer.getActionName(path, fnKey));
      });
    }
  }
  registerActions = (actions, path, prevPath = '') => {
    if (typeof actions === 'function') {
      _.set(this.actions, path, actionable(actions, prevPath, false));
    } else {
      _.set(this.actions, path, {});
      _.each(actions, (fn, fnKey) => {
        this.registerActions(fn, Reducer.getActionName(path, fnKey), path);
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
  getInitialState(initialState) {
    return initialState || this.initialState || {};
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
  constructor(initialState) {
    this.actions = this.getActions();
    this.dispatches = this.getDispatches();
    this.initialState = this.getInitialState(initialState);
    this.selectors = this.getSelectors();
    _.each(this.initialState, (value, key) => {
      if (value instanceof Reducer) {
        this.registerMixin(value, key);
      }
    });
  }
  getClearActionType(action) {
    return action.type.split(`${this.constructor.name}.`).pop();
  }
  static getActionName(path, fnKey) {
    return `${path}.${fnKey}`;
  }
  static getActionDispatchName(path, fnKey) {
    return `${path}${path ? '.' : ''}${fnKey}`;
  }
  getDispatchName(path) {
    return `${this.constructor.name}.${path}`;
  }
  reducer = (state = this.initialState, action) => {
    const clearActionType = this.getClearActionType(action);
    const callableAction = _.get(this.actions, clearActionType);
    return callableAction ? callableAction(state, action) : state;
  };
}
