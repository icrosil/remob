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
    const instance = new RealReducer();
    const connect = jest.fn();
    beforeEach(() => {
      setConnector(connect);
    });
    it('should call connector after registration', () => {
      connectRemob();
      expect(connect).toHaveBeenCalled();
    });
    it("should work with 'remob' interface", () => {
      combineRemob({ instance });
      connectRemob('RealReducer');
      expect(inject).toHaveBeenCalledWith({
        RealReducer: instance,
      });
    });
  });
  // TODO interface1 - ('remob1', 'remob2')
  // TODO interface2 - (remob1, remob2)
  // TODO interface3 - ({ remob1: remob2 })
  // TODO interface4 - combined
  // TODO add way to change names of reducers
});
