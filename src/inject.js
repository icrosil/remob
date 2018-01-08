import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';

// TODO think about rename this method
// TODO think about need of this method at all
// TODO think about how to use inject ->
// - over class of component and pass props to render/willupdate/shouldupdate etc
// - over connect just to reinject props (this option implemented now)
export default (stores) => {
  // TODO gather stmap and dsmap
  const stateMappers = state => mapValues(
    stores,
    (store, key) => ({
      ...state[key],
      ...mapValues(
        store.selectors,
        selector => selector(state[key], state),
      ),
    }),
  );
  const dispatchMappers = dispatch => mapValues(
    stores,
    store => mapValues(
      store.actions,
      (action, key) => () => store[key](dispatch),
    ),
  );
  // TODO think about what should we do with ownProps
  const mapState = state => stateMappers(state);
  // TODO thinkout how to avoid this changing keys
  const mapDispatch = dispatch => mapKeys(dispatchMappers(dispatch), (store, key) => `${key}Action`);
  // TODO check if mapState and mapDispatch gathering or should have different names
  return [mapState, mapDispatch];
};
