import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import get from 'lodash/get';

export default (func, path, isFullStatePassed = true) => {
  if (typeof path === 'string') {
    return (state, action) => {
      const nextState = cloneDeep(state);
      const updatedPart = func(isFullStatePassed ? state : get(state, path), action);
      set(nextState, path, updatedPart);
      return nextState;
    };
  }
  return (state, action) => func(state, action);
};
