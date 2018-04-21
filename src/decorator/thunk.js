import action from './action';

const dispatcher = (method, fn) => dispatch => dispatch(fn);

/**
 * thunk decorator just passes function to dispatch instead of plain object like action decorator does
 * @method
 * @return {decorator}
 */
export default action(undefined, undefined, dispatcher);
