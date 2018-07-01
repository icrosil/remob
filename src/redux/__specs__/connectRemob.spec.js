import connectRemob, { setConnector } from '../connectRemob';
import combineRemob from '../combineRemob';
import Reducer from '../Reducer';
import inject from '../inject';

jest.mock('../inject', () => jest.fn(() => []));

describe('connectRemob', () => {
  it('should be a func', () => {
    expect(connectRemob).toEqual(expect.any(Function));
    expect(setConnector).toEqual(expect.any(Function));
  });

  describe('without connector', () => {
    beforeEach(() => {
      setConnector();
    });
    it('should throw if no connector specified', () => {
      expect(() => connectRemob()).toThrow();
    });
  });

  describe('with connector', () => {
    class RealReducer extends Reducer {}
    const connect = jest.fn();
    const instance = new RealReducer();
    const instance2 = new RealReducer();
    const instance3 = new RealReducer();
    beforeEach(() => {
      setConnector(connect);
    });
    it('should call connector after registration', () => {
      connectRemob();
      expect(connect).toHaveBeenCalled();
    });
    it("should work with 'remob' interface", () => {
      combineRemob({ instance });
      connectRemob('instance');
      expect(inject).toHaveBeenCalledWith({
        instance,
      });
    });
    it('should work with remob interface', () => {
      combineRemob({ instance2 });
      connectRemob(instance2);
      expect(inject).toHaveBeenCalledWith({
        instance2,
      });
    });
    it('should work with { remob } interface', () => {
      combineRemob({ instance3 });
      connectRemob({ instance1: instance3 });
      expect(inject).toHaveBeenCalledWith({
        instance1: instance3,
      });
    });
    it('should work all interfaces', () => {
      connectRemob('instance', instance2, { instance4: instance3 });
      expect(inject).toHaveBeenCalledWith({
        instance,
        instance2,
        instance4: instance3,
      });
    });
  });
});
