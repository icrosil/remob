import { validate } from '../decorator';
import Reducer from '../../Reducer';

describe('decorator', () => {
  const instance = new Reducer();
  describe('validate', () => {
    test('should be a function with 4 length', () => {
      expect(validate).toEqual(expect.any(Function));
      expect(validate).toHaveLength(4);
    });
    test('should throw on 1 param is not reducer', () => {
      expect(validate).toThrow(SyntaxError);
    });
    test('should throw on 2 param is not function', () => {
      const reducerValidate = validate.bind(null, instance);
      expect(reducerValidate).toThrow(SyntaxError);
    });
  });
});
