# remob
Rethinking of Redux and MobX

[![Build Status](https://travis-ci.org/icrosil/remob.svg?branch=master)](https://travis-ci.org/icrosil/remob)  [![Coverage Status](https://coveralls.io/repos/github/icrosil/remob/badge.svg?branch=master)](https://coveralls.io/github/icrosil/remob?branch=master)  [![Maintainability](https://api.codeclimate.com/v1/badges/6fe830dc12447fa3922b/maintainability)](https://codeclimate.com/github/icrosil/remob/maintainability)  [![Version](https://img.shields.io/npm/v/remob.svg)](https://www.npmjs.com/package/remob) [![dependencies Status](https://david-dm.org/icrosil/remob/status.svg)](https://david-dm.org/icrosil/remob)

## what is remob?
remob - is an experiment to combine simple state management from Redux and effective sides of MobX.

## why to remob?
#### Redux
Redux is good and gives correct vision of state management, flow of data, consequences of changes.
But also from the box it gives such a big amount of options to create your application that could be a bit frustrating. Biggest concerns I would like to change are:
- lot of code to init your `not an array` store
- action types produces namespace issue
- switch case need
  - sure here you can use additional `redux-actions` or similar
- small HOR usage
  - should be on top of everything right from start
- hell in form usage
  - `redux-form` trying to fix this
- `mapState` & `mapDispatch`
  - this selectors and actions should just live in store. So store should have ability to combine it

#### MobX
MobX is also a good option for state management with pros and cons.
`mobx-form` hepls with form creation having only metainfo of form and provides any form you want it to be.
Usage of `classes` and `decorators` are just beautiful with combining all needed data inside of instance - selectors, actions, etc.
But using MobX after Redux you probably faced with lack of unidirectional flow, immutability and all pretty things Redux has.

#### remob
also on building this as small as possible next points should be covered:
- more testability in mind
- don't expand to spaghetti and have structures with easy to expand possibility
