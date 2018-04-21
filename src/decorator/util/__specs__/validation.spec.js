import validation from '../validation';
import Reducer from '../../../redux/Reducer';

describe('decorator', () => {
  const instance = new Reducer();
  describe('validation', () => {
    test('should be a function with 4 length', () => {
      expect(validation).toEqual(expect.any(Function));
      expect(validation).toHaveLength(4);
    });
    test('should throw on 1 param is not reducer', () => {
      expect(validation).toThrow(SyntaxError);
    });
    test('should throw on 2 param is not function', () => {
      const reducerValidate = validation.bind(null, instance);
      expect(reducerValidate).toThrow(SyntaxError);
    });
  });
});
