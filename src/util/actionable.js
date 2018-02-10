export default (func, path, isFullStatePassed = true) => {
  if (typeof path === 'string') {
    return (state, action) => {
      const updatedState = { ...state };
      const partPath = path.split('.').shift();
      return {
        ...state,
        [partPath]: func(isFullStatePassed ? updatedState : state[partPath], action),
      };
    };
  }
  return (state, action) => func(state, action);
};
