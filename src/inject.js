import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';
import get from 'lodash/get';

// TODO change name
// TODO refactor
const m1 = (selectors, state, statePath) => ({
  ...get(state, statePath),
  ...mapValues(
    selectors,
    (selector, selectorKey) => {
      if (typeof selector === 'function') {
        return selector(get(state, statePath), state);
      }
      const path = `${statePath}.${selectorKey}`;
      return m1(selector, state, path);
    },
  ),
});

const mapActionToDispatch = (actions, store, dispatch, actionPrefix = '') => mapValues(
  actions,
  (action, actionKey) => {
    const path = `${actionPrefix}${actionPrefix ? '.' : ''}${actionKey}`;
    if (typeof action === 'function') {
      return () => get(store, path)(dispatch);
    }
    return mapActionToDispatch(action, store, dispatch, path);
  },
);

// TODO think about rename this method
// TODO think about need of this method at all
// TODO think about how to use inject ->
// - over class of component and pass props to render/willupdate/shouldupdate etc
// - over connect just to reinject props (this option implemented now)
export default (stores) => {
  // TODO gather stmap and dsmap
  const stateMappers = state => mapValues(
    stores,
    (store, storeKey) => m1(store.selectors, state, storeKey),
  );
  const dispatchMappers = dispatch => mapValues(
    stores,
    store => mapActionToDispatch(store.actions, store, dispatch),
  );
  // TODO think about what should we do with ownProps
  const mapState = state => stateMappers(state);
  // TODO thinkout how to avoid this changing keys
  const mapDispatch = dispatch => mapKeys(dispatchMappers(dispatch), (store, key) => `${key}Action`);
  // TODO check if mapState and mapDispatch gathering or should have different names
  return [mapState, mapDispatch];
};
