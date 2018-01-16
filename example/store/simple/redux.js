export const ACTIONS = {
  RANDOMIZE: 'RANDOMIZE',
};

export const initialState = {
  field: 0,
};

export const randomize = dispatch => dispatch({ type: ACTIONS.RANDOMIZE });

export const thunkRandomize = dispatch => dispatch((fire) => {
  randomize(fire);
});

export const formatValue = value => 1 + value;

export const randomizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.RANDOMIZE:
      return { ...state, field: Math.random() };
    default:
      return state;
  }
};

export default randomizeReducer;
