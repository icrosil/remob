import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import get from 'lodash/get';

// TODO fix hard example + add examples for deep + inheritance.
// TODO add tests for deep + inheritance
// TODO probably i should try separate inheritance by `/` and make deep by dot or pathable way

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
