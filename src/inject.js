import _ from 'lodash';

import Reducer from './Reducer';

const mapSelectorsToDispatch = (selectors, state, statePath, opts) => ({
  ..._.get(state, statePath),
  ..._.mapValues(
    selectors,
    (selector, selectorKey) => {
      if (typeof selector === 'function') {
        return selector(_.get(state, statePath), state, opts);
      }
      const path = Reducer.getActionName(statePath, selectorKey);
      return mapSelectorsToDispatch(selector, state, path, opts);
    },
  ),
});

const mapActionToDispatch = (actions, store, dispatch, opts, actionPrefix = '') => _.mapValues(
  actions,
  (action, actionKey) => {
    const path = Reducer.getActionDispatchName(actionPrefix, actionKey);
    if (typeof action === 'function') {
      return value => _.get(store, path)(dispatch, { opts, value });
    }
    return mapActionToDispatch(action, store, dispatch, opts, path);
  },
);

const mergeProps = (stateProps, dispatchProps, ownProps) => _.merge({}, stateProps, dispatchProps, ownProps);

export default (stores) => {
  const stateMappers = (state, opts) => _.mapValues(
    stores,
    (store, storeKey) => mapSelectorsToDispatch(store.selectors, state, storeKey, opts),
  );
  const dispatchMappers = (dispatch, opts) => _.mapValues(
    stores,
    store => mapActionToDispatch(store.actions, store, dispatch, opts),
  );
  const mapState = (state, ...args) => stateMappers(state, args);
  const mapDispatch = (dispatch, ...args) => dispatchMappers(dispatch, args);
  return [mapState, mapDispatch, mergeProps];
};
