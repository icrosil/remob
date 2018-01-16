// TODO make this reducer as HOR from simple

export const ACTIONS = {
  RANDOMIZE_ONE: 'RANDOMIZE_ONE',
  RANDOMIZE_TWO: 'RANDOMIZE_TWO',
};

const initialState = {
  fieldOne: 0,
  fieldTwo: 0,
};

export const randomizeOne = dispatch => dispatch({ type: ACTIONS.RANDOMIZE_ONE });
export const randomizeTwo = dispatch => dispatch({ type: ACTIONS.RANDOMIZE_TWO });

export const randomizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.RANDOMIZE_ONE:
      return { ...state, fieldOne: Math.random() };
    case ACTIONS.RANDOMIZE_TWO:
      return { ...state, fieldTwo: Math.random() };
    default:
      return state;
  }
};

export default randomizeReducer;
