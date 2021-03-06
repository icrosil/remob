# remob
Rethinking of Redux and MobX

[![Build Status](https://travis-ci.org/icrosil/remob.svg?branch=master)](https://travis-ci.org/icrosil/remob)  [![Coverage Status](https://coveralls.io/repos/github/icrosil/remob/badge.svg?branch=master)](https://coveralls.io/github/icrosil/remob?branch=master)  [![Maintainability](https://api.codeclimate.com/v1/badges/6fe830dc12447fa3922b/maintainability)](https://codeclimate.com/github/icrosil/remob/maintainability)  [![Version](https://img.shields.io/npm/v/remob.svg)](https://www.npmjs.com/package/remob) [![dependencies Status](https://david-dm.org/icrosil/remob/status.svg)](https://david-dm.org/icrosil/remob) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## what is remob?
remob - is an experiment to improve usability for redux. It is build upon combining simple state management from Redux and effective usability of MobX and decorator power.

## why to remob?
In comparing giants like Redux and MobX you can find pros and cons in usage for both sides, but what if we can take pros out of them? As general idea I was wondering if it possible to give Redux more structure and easiness in usage like i felt using MobX but without overwhelmed observables.

#### Redux
Redux is good and gives correct vision of state management, flow of data, consequences of changes.
But also from the box it gives such a big amount of options to create your application that could be a bit frustrating. Biggest concerns I would like to change are:
- lot of code to init your `not an array` store
  - when your app grows enough you can find yourself in situation when you have to create lot of dumb files/code to achieve simple logic and align to your structure.
- action types produces namespace issue and you have to almost duplicate initial state to actions and so on
- switch case need within reducer
  - sure here you can use additional `redux-actions` or similar but its additional wrapper
- small HOR usage
  - you cannot just have one reducer and simply reuse it from another one, to have it you need HOR and then use it like HOR everywhere, but in my opinion this should be on top of everything right from start
- `mapState` & `mapDispatch`
  - i've seen a lot of having this guys near to components even with possibility to have near store, this selectors and actions should just live in store. So store should have ability to combine it

#### MobX
MobX is also a good option for state management with pros and cons.
Usage of `classes` and `decorators` are just beautiful with combining all needed data inside of instance - selectors, actions, etc.
But using MobX after Redux you probably faced with lack of unidirectional flow, immutability and all pretty things Redux has.
Observables as pattern are good, but predictability and unidirectional flow worth more.

#### remob
So basically this is the wrapper upon Redux with decorator usage.
Enjoy to use it =)

## v0 -> v1
Please add `setCombiner` to your code.
Check out `setCombiner` doc [here](https://github.com/icrosil/remob#setcombiner).

## Installation
- `yarn add remob`
- `import remob from 'remob';`

## API
Remob has 8 exports from index file, they are:
- Reducer
- action
- selector
- thunk
- inject
- combineRemob
- connectRemob
- setConnector
- setCombiner

#### Reducer
Is a main class to start with. When you want to create new remob you should import `Reducer` and extend remob from `Reducer` or another remob. Inside of `Reducer` live only registrators and reducer implementation.
```
import { Reducer } from remob;

class Counter extends Reducer {
  initialState = { field: 0 };
}

export default new Counter();
```

##### debug
To see all actions and selectors that remob registered, you can use
`remob.debug()` method - this will `console.log` every registered action and selector.

#### action
Is a decorator to use within Reducer. You may use it like function `@action()` or like statement `@action`.
Using this on some function in remob will produce next actions:
- registrate action to remob and reducer
- make this function to be dispatchable

implementation of actionable functions should be like reducer that will be fired only on this action. It takes 2 params as arguments state and action.

action could be an implementation for part of state, for this case you have to pass property name to first param - `@action('field')`

```
import { Reducer, action } from remob;

class Counter extends Reducer {
  initialState = {
    field: 0,
    deep: {
      field: 42,
    }
  };
  // @action would do the same
  @action() increment(state) {
    return {
      ...state,
      field: state.field + 1,
    }
  }
  @action('field') incrementField(state) {
    return state.field + 1;
  }
  // both actions will work just equal.

  // deep path exist, _.get powered.
  @action('deep.field') incrementDeepField(state) {
    return state.deep.field + 1;
  }
  // functions supported, more dynamic for your needed flow
  @action(state => (Math.random() > 0.5 ? 'field' : 'deep.field')) changeRandomPart(state) {
    return Math.random();
  }
}

export default new Counter();
```

#### selector
Is a decorator to write selectors from state to components.
```
import { Reducer, selector } from remob;

class Counter extends Reducer {
  initialState = { field: 0 };
  @selector incremented(state) {
    return state.field + 1;
  }
}

export default new Counter();
```

#### thunk
Is a decorator very similar to action but with one change - it has different dispatchable method and it will call function implementation as argument to dispatch. Usable to create side effects within thunk middleware.
```
import { Reducer, thunk } from remob;

class Counter extends Reducer {
  initialState = { field: 0 };
  @thunk decrement(dispatch, getState) {
    ...
  }
}

export default new Counter();
```
#### inject
Is a function to inject remobs into component using connect. It takes object of remobs you want to pass, get every action/selector/thunk/state and mapps dispatch and state and them merges to 1 object.

Keys of argument should equal to how you created stores of them and value should be a remob.
```
import { connect } from 'react-redux'
import { inject } from remob;

import Component from './Component'
import remobImplementation from '../store/remob'

export default connect(...inject({
  remob: remobImplementation,
}))(Component)
```
#### combineRemob
Is a function to combine remobs for store creating, it takes reducer implementation of every remob passed.

```
import { combineRemob } from 'remob'
import { createStore } from 'redux'

import stores from '../stores'

createStore(combineRemob(stores))
```

Make sure you pass uniq names for stores as it will throw an error if you have any duplicate.

#### connectRemob
For easy connect stores to components use `connectRemob` method.
It is simple facade over connector (such as `react-redux` provides).
`connectRemob` doesn't have default connector so you have to pass your connector.
Please have a look to `setConnector` method.

Interface gives ability to pass remobs in 3 ways:
- strings
- remob
- object with remobs

```
// assume 3 stores already exist named 'store1', 'store2', 'store3'
import { connectRemob } from 'remob'
import store2 from '../stores/store2'

const Component = props => <YourAwesomeComponent {...props} />;

// string store
connectRemob('store1')(YourAwesomeComponent);
// instance store
connectRemob(store2)(YourAwesomeComponent);
// object store
connectRemob({ store4: store2 })(YourAwesomeComponent);
```

It will automatically get already registered remobs and pass them to component.
Names will be taken from `combineRemob` by keys assigned to each remob.
You can override this names by passing object of remobs.

#### setConnector
Defines what exact connector will be used on `connectRemob` method.

```
import { setConnector } from 'remob';
import { connect } from 'react-redux';

setConnector(connect);
```

#### setCombiner
Defines what exact combineReducers for injection.
Setup this on state initiating.

```
import { setCombiner } from 'remob';
import { combineReducers } from 'redux';

setCombiner(combineReducers);
```

## influence
- [redux](https://redux.js.org/)
- [redux-knife-manager](https://github.com/madetheforcebewithyou/redux-knife-manager)
- [MobX](https://github.com/mobxjs/mobx)
- [react-easy-state](https://github.com/solkimicreb/react-easy-state)
