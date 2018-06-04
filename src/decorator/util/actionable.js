import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import get from 'lodash/get';

const actionableSkeleton = (func, path, isFullStatePassed) => (state, action) => {
  const nextState = cloneDeep(state);
  const updatedPart = func(isFullStatePassed ? state : get(state, path), action);
  set(nextState, path, updatedPart);
  return nextState;
};

export default (func, pathArg, isFullStatePassed = true) => {
  const typeArg = typeof pathArg;
  switch (typeArg) {
    case 'string':
      return actionableSkeleton(func, pathArg, isFullStatePassed);
    case 'function':
      return (state, action) => {
        const path = pathArg(state);
        return actionableSkeleton(func, path, isFullStatePassed)(state, action);
      };
    default:
      return (state, action) => func(state, action);
  }
};
