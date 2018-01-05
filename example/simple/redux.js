export const ACTIONS = {
  RANDOMIZE: 'RANDOMIZE',
};

const initialState = {
  field: 0,
};

export const randomize = dispatch => dispatch({
  type: ACTIONS.RANDOMIZE,
});

export const randomizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.RANDOMIZE:
      return { ...state, field: Math.random() };
    default:
      return state;
  }
};

export default randomizeReducer;
