export const validate = (fn, method, decoratorType) => {
  if (typeof fn !== 'function' || typeof method !== 'string') {
    throw new SyntaxError(`${decoratorType} decorator method ${method} is not a function.`);
  }
};

export default null;
