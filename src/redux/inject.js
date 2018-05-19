import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import merge from 'lodash/merge';

import Reducer from './Reducer';

const mapSelectorsToDispatch = (selectors, state, statePath, opts) => ({
  ...get(state, statePath),
  ...mapValues(
    selectors,
    (selector, selectorKey) => {
      if (typeof selector === 'function') {
        return selector(get(state, statePath), state, opts);
      }
      const path = Reducer.getActionName(statePath, selectorKey);
      return mapSelectorsToDispatch(selector, state, path, opts);
    },
  ),
});

const mapActionToDispatch = (actions, store, dispatch, opts, actionPrefix = '') => mapValues(
  actions,
  (action, actionKey) => {
    const path = Reducer.getActionName(actionPrefix, actionKey);
    if (typeof action === 'function') {
      return value => get(store, path)(dispatch, { opts, value });
    }
    return mapActionToDispatch(action, store, dispatch, opts, path);
  },
);

const mergeProps = (stateProps, dispatchProps, ownProps) => merge({}, stateProps, dispatchProps, ownProps);

/**
 * injector to combine actions, state, selectors and pass it to component as props
 * @method
 * @param  {Object} stores remob instances
 * @return {Array}         mappers and merge function
 */
export default (stores) => {
  const stateMappers = (state, opts) => mapValues(
    stores,
    (store, storeKey) => mapSelectorsToDispatch(store.selectors, state, storeKey, opts),
  );
  const dispatchMappers = (dispatch, opts) => mapValues(
    stores,
    store => mapActionToDispatch(store.actions, store, dispatch, opts),
  );
  const mapState = (state, ...args) => stateMappers(state, args);
  const mapDispatch = (dispatch, ...args) => dispatchMappers(dispatch, args);
  return [mapState, mapDispatch, mergeProps];
};
