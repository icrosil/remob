import { action, selector, Reducer } from '../..';

describe('Reducer', () => {
  const dispatch = (reducer, act) => {
    reducer(undefined, act);
  };
  test('should work fine with mixin', () => {
    class RealReducer extends Reducer {
      initialState = {
        field: 1,
        deep: {
          field: 42,
        },
      }

      @action('field') setTwo() {
        return 2;
      }

      @action('deep.field') setDeepThree() {
        return 3;
      }

      @selector getOne() {
        return 11;
      }
    }
    const real = new RealReducer();
    class InheritReducer extends Reducer {
      getInitialState() {
        return {
          fieldOne: real,
          fieldTwo: 2,
        };
      }
    }
    const inherit = new InheritReducer();
    expect(inherit).toBeInstanceOf(Reducer);
  });
  describe('registerAction', () => {
    test('should set up new action', () => {
      const instance = new Reducer();
      instance.registerAction('fn', 'method');
      expect(instance.actions).toEqual({ method: 'fn' });
    });
  });
  describe('registerDispatch', () => {
    test('should set up new dispatch', () => {
      const instance = new Reducer();
      instance.registerDispatch('fn', 'method');
      expect(instance.dispatches).toEqual({ method: 'fn' });
    });
  });
  describe('registerSelector', () => {
    test('should set up new selector', () => {
      const instance = new Reducer();
      instance.registerSelector('fn', 'method');
      expect(instance.selectors).toEqual({ method: 'fn' });
    });
  });
  describe('registerDispatches', () => {
    const instance = new Reducer();
    const dispatchable = jest.fn();
    test('should set up new dispatches from function', () => {
      instance.registerDispatches(dispatchable, 'method');
      expect(instance.method).toEqual(expect.any(Function));
      instance.method();
      expect(dispatchable).toHaveBeenCalledWith('Reducer.method');
    });
    test('should set up new dispatches from mixin', () => {
      instance.registerDispatches({ dispatchable }, 'method');
      expect(instance.method.dispatchable).toEqual(expect.any(Function));
      instance.method.dispatchable();
      expect(dispatchable).toHaveBeenCalledWith('Reducer.method.dispatchable');
    });
  });
  describe('registerActions', () => {
    const instance = new Reducer();
    const actionable = jest.fn();
    test('should set up new action from function', () => {
      instance.registerActions(actionable, 'method');
      expect(instance.actions.method).toEqual(expect.any(Function));
      instance.actions.method({});
      expect(actionable).toHaveBeenCalled();
    });
    test('should set up new action from mixin', () => {
      instance.registerActions({ actionable }, 'method');
      expect(instance.actions.method.actionable).toEqual(expect.any(Function));
      instance.actions.method.actionable({});
      expect(actionable).toHaveBeenCalled();
    });
    test('should set up new action with prevPath', () => {
      const spy = jest.fn();
      instance.registerActions({
        deep: {
          actionable: spy,
        },
      }, 'method');
      expect(instance.actions.method.deep.actionable).toEqual(expect.any(Function));
      instance.actions.method.deep.actionable({ method: 0 }, 'deep.actionable.method');
      expect(spy).toHaveBeenCalledWith(0, 'deep.actionable.method');
    });
  });
  describe('registerMixin', () => {
    const instance = new Reducer();
    instance.registerActions = jest.fn();
    instance.registerDispatches = jest.fn();
    test('should set up mixin', () => {
      instance.registerMixin({
        initialState: 'initialState',
        dispatches: 'dispatches',
        selectors: 'selectors',
        actions: 'actions',
      }, 'mixin');
      expect(instance.initialState.mixin).toEqual('initialState');
      expect(instance.dispatches.mixin).toEqual('dispatches');
      expect(instance.selectors.mixin).toEqual('selectors');
      expect(instance.registerActions).toHaveBeenCalledWith('actions', 'mixin');
      expect(instance.registerDispatches).toHaveBeenCalledWith('dispatches', 'mixin');
    });
  });
  describe('reducer', () => {
    const instance = new Reducer();
    const actionTrash = {
      type: 'trash',
    };
    test('should be a function', () => {
      expect(instance.reducer).toEqual(expect.any(Function));
    });
    test('should use initialState on undefined', () => {
      const nextState = instance.reducer(undefined, actionTrash);
      expect(nextState).toEqual({});
    });
    test('should return first param on trash action', () => {
      const nextState = instance.reducer({}, actionTrash);
      expect(nextState).toEqual({});
    });
    test('should call action on registered action', () => {
      const actionCallback = jest.fn(() => 'nextState');
      instance.registerAction(actionCallback, 'method');
      const nextState = instance.reducer({}, { type: 'Reducer.method' });
      expect(nextState).toEqual('nextState');
    });
  });
  describe('debug', () => {
    class ExampleReducer extends Reducer {
      @action func() {
        return 1;
      }
    }
    const instance = new ExampleReducer();
    class InheritReducer extends Reducer {
      @action func1() {
        return 1;
      }

      getInitialState() {
        return {
          instance,
        };
      }
    }
    const inheritInstance = new InheritReducer();
    describe('commonDebug', () => {
      it('should be a callable function with 3 params', () => {
        expect(inheritInstance.commonDebug).toEqual(expect.any(Function));
        expect(inheritInstance.commonDebug).toHaveLength(3);
        expect(inheritInstance.commonDebug(inheritInstance.actions)).toBe(undefined);
      });
    });
    describe('debug', () => {
      it('should be a callable function with 2 params', () => {
        expect(inheritInstance.debug).toEqual(expect.any(Function));
        expect(inheritInstance.debug).toHaveLength(2);
        expect(inheritInstance.debug(inheritInstance.actions)).toBe(undefined);
      });
    });
  });
  describe('performance', () => {
    const perf = (cb) => {
      const start = new Date();
      cb();
      const end = new Date();
      const diff = end - start;
      return diff;
    };
    class ExampleReducer extends Reducer {
      @action perf() {
        return 1;
      }
    }
    const instance = new ExampleReducer();
    it('should take < 2ms to create simple remob', () => {
      const diff = perf(() => {
        class SomeReducer extends Reducer {
          @action perf() {
            return 1;
          }
        }
        const instanceSome = new SomeReducer();
        return instanceSome;
      });
      expect(diff).toBeLessThan(2);
    });
    it('should take < 2ms to call action of remob', () => {
      const diff = perf(() => {
        instance.perf(act => dispatch(instance.reducer, act));
      });
      expect(diff).toBeLessThan(2);
    });
  });
});
