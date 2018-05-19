import get from 'lodash/get';
import set from 'lodash/set';
import each from 'lodash/each';
import partialRight from 'lodash/partialRight';

import actionable from '../decorator/util/actionable';

/**
 * Reducer class to create reducers,
 * has method to register actions/dispatches/selectors.
 * works with namings and mixins.
 * contains reducer implementation which resolves registered actions.
 * @type {Reducer}
 */
class Reducer {
  commonDebug(registrations, registered, path) {
    const passedRegistered = registered || registrations;
    const passedPath = path || this.getDispatchName();
    Object.keys(passedRegistered).forEach((actionKey) => {
      const action = passedRegistered[actionKey];
      const actionPath = Reducer.getActionName(passedPath, actionKey);
      if (typeof action === 'function') {
        console.log(actionPath);
      } else {
        this.commonDebug(registrations, action, actionPath);
      }
    });
  }
  debug(actions, path) {
    if (!actions && !path) {
      console.log(this.getDispatchName(), 'remob');
    }
    console.log('actions');
    this.commonDebug(this.actions);
    console.log('selectors');
    this.commonDebug(this.selectors);
  }
  /**
   * simple action register
   * reducer will check this implementations to call on some change
   */
  registerAction(fn, path) {
    this.actions = this.getActions();
    set(this.actions, path, fn);
  }
  /**
   * simple dispatch register
   * on inherit it will get this dispatches to pass through
   */
  registerDispatch(fn, path) {
    this.dispatches = this.getDispatches();
    set(this.dispatches, path, fn);
  }
  /**
   * simple selector register
   * needed for inherit purposes as dispatch
   */
  registerSelector(fn, path) {
    this.selectors = this.getSelectors();
    set(this.selectors, path, fn);
  }
  /**
   * inherit register dispatches
   * it partially makes automatic insertion of methods into class from other remob
   * it does not push this dispatches in this.disaptches, you have to do it elsewhere
   * like registerMixin does
   */
  registerDispatches(dispatches, path) {
    if (typeof dispatches === 'function') {
      set(this, path, partialRight(dispatches, this.getDispatchName(path)));
    } else {
      each(dispatches, (fn, fnKey) => {
        this.registerDispatches(fn, Reducer.getActionName(path, fnKey));
      });
    }
  }
  /**
   * inherit register action
   * it passes implementation of actions to this.action
   * pretending to be @action - making function to be actionable.
   */
  registerActions(actions, path, prevPath = '') {
    if (typeof actions === 'function') {
      this.registerAction(actionable(actions, prevPath, false), path);
    } else {
      each(actions, (fn, fnKey) => {
        this.registerActions(fn, Reducer.getActionName(path, fnKey), prevPath || path);
      });
    }
  }
  /**
   * inherit register mixin
   * manually pushes registers for dispatch and selectors, as well as initial state
   * automatically passes actionale and dispatchables with registerDispatches and registerActions.
   */
  registerMixin(mixin, mixinKey) {
    const {
      actions, dispatches, initialState, selectors,
    } = mixin;
    this.initialState[mixinKey] = initialState;
    this.dispatches[mixinKey] = dispatches;
    this.selectors[mixinKey] = selectors;
    this.registerActions(actions, mixinKey);
    this.registerDispatches(dispatches, mixinKey);
  }
  // getters
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
    // binds
    this.registerDispatches = this.registerDispatches.bind(this);
    this.registerActions = this.registerActions.bind(this);
    this.registerMixin = this.registerMixin.bind(this);
    this.getDispatchName = this.getDispatchName.bind(this);
    this.getClearActionType = this.getClearActionType.bind(this);
    this.debug = this.debug.bind(this);
    this.commonDebug = this.commonDebug.bind(this);
    this.reducer = this.reducer.bind(this);
    // default setters
    this.actions = this.getActions();
    this.dispatches = this.getDispatches();
    this.initialState = this.getInitialState(initialState);
    this.selectors = this.getSelectors();
    // mixin registrator
    each(this.initialState, (value, key) => {
      if (value instanceof Reducer) {
        this.registerMixin(value, key);
      }
    });
  }
  // path helpers
  getClearActionType(action) {
    return action.type.split(`${this.constructor.name}.`).pop();
  }
  static getActionName(path, fnKey = '') {
    return `${path}${path && fnKey ? '.' : ''}${fnKey}`;
  }
  getDispatchName(path) {
    return Reducer.getActionName(this.constructor.name, path);
  }
  // reducer
  reducer(state = this.initialState, action) {
    const clearActionType = this.getClearActionType(action);
    const callableAction = get(this.actions, clearActionType);
    return callableAction ? callableAction(state, action) : state;
  }
}


export default Reducer;
