/* eslint-disable new-cap */
// @flow

import { Record } from 'immutable'
import createEditableConstants from '../create-editable-constants'
import createEditableReducer from '../create-editable-reducer.js'
import { rawInitialState } from '../initial-state.js'
import { expect } from 'chai'
import data from './test-data/categories.json'
import { loadEntities } from './helpers'

const moduleName = 'post-category'
const constants = createEditableConstants(moduleName)
const reducer = createEditableReducer(constants)
const error = { message: 'Some error' }
const _id = data.entities[0]._id
const edited = data.entities[0]
const removed = data.entities[0]

const {
  CREATE_START, CREATE_SUCCESS, CREATE_FAIL,
  LOAD_DETAIL_SUCCESS,
  EDIT, CANCEL_EDIT,
  SUBMIT_EDIT_START, SUBMIT_EDIT_SUCCESS, SUBMIT_EDIT_FAIL,
  ADD, CANCEL_ADD,
  SUBMIT_ADD_START, SUBMIT_ADD_SUCCESS, SUBMIT_ADD_FAIL,
  REMOVE, CANCEL_REMOVE,
  SUBMIT_REMOVE_START, SUBMIT_REMOVE_SUCCESS, SUBMIT_REMOVE_FAIL,
} = constants

const CrudRecord = Record(rawInitialState)

describe('Editable Reducer', () => {
  describe('Add', () => {
    let state

    beforeEach(() => {
      state = CrudRecord(rawInitialState)
      state = loadEntities({ moduleName, state, reducer, data })
    })

    function clickAdd() {
      it('click add', () => {
        state = reducer(state, { type: ADD })
        expect(state.toJS()).to.have.property('isEdit', true)
        expect(state.toJS().selected).to.deep.equal({})
      })
    }

    function startSubmitAdd() {
      it('start submit', () => {
        state = reducer(state, { type: SUBMIT_ADD_START })
        expect(state.toJS()).to.have.property('isSubmittingEdit', true)
      })
    }

    describe('Add success', () => {
      clickAdd()
      startSubmitAdd()

      it('submit success', () => {
        state = reducer(state, { type: SUBMIT_ADD_SUCCESS, payload: { slug: 'category-01', name: 'Category 01' } })
        expect(state.toJS()).to.have.property('isEdit', false)
        expect(state.toJS()).to.have.property('isSubmittingEdit', false)

        expect(Object.keys(state.toJS().entities)).to.have.property('length', 11)
        expect(state.toJS().result).to.have.property('length', 11)
        expect(state.toJS()).to.have.property('count', 15) // increase count

        expect(state.toJS()).to.have.property('notification')
        expect(state.toJS().notification).to.have.property('message', 'Add Successfully')
        expect(state.toJS().notification).to.have.property('type', 'info')
      })
    })

    describe('Cancel add', () => {
      clickAdd()

      it('cancel add', () => {
        state = reducer(state, { type: CANCEL_ADD })
        expect(state.toJS()).to.have.property('isEdit', false)
        expect(state.toJS()).to.have.property('selected', null)
      })
    })

    describe('Add fail', () => {
      clickAdd()
      startSubmitAdd()

      it('submit fail', () => {
        state = reducer(state, { type: SUBMIT_ADD_FAIL, payload: error })
        expect(state.toJS()).to.have.property('isEdit', false)
        expect(state.toJS()).to.have.property('isSubmittingEdit', false)

        expect(state.toJS()).to.have.property('notification')
        expect(state.toJS().notification).to.have.property('message', 'Add Fail')
        expect(state.toJS().notification).to.have.property('type', 'error')
      })
    })
  })

  describe('Create', () => {
    let state

    beforeEach(() => {
      state = CrudRecord(rawInitialState)
      state = loadEntities({ moduleName, state, reducer, data })
    })

    function startSubmitCreate() {
      it('start', () => {
        state = reducer(state, { type: CREATE_START })
        expect(state.toJS()).to.have.property('isSubmittingEdit', true)
      })
    }

    describe('Create success', () => {
      startSubmitCreate()

      it('success', () => {
        state = reducer(state, { type: CREATE_SUCCESS, payload: { slug: 'category-01', name: 'Category 01' } })
        expect(state.toJS()).to.have.property('isEdit', false)
        expect(state.toJS()).to.have.property('isSubmittingEdit', false)

        expect(state.toJS()).to.have.property('notification')
        expect(state.toJS().notification).to.have.property('message', 'Create Successfully')
        expect(state.toJS().notification).to.have.property('type', 'info')

        expect(Object.keys(state.toJS().entities)).to.have.property('length', 11)
        expect(state.toJS().result).to.have.property('length', 11)
        expect(state.toJS()).to.have.property('count', 15) // increase count
      })
    })

    describe('Create fail', () => {
      startSubmitCreate()

      it('fail', () => {
        state = reducer(state, { type: CREATE_FAIL, payload: error })
        expect(state.toJS()).to.have.property('isEdit', false)
        expect(state.toJS()).to.have.property('isSubmittingEdit', false)

        expect(state.toJS()).to.have.property('notification')
        expect(state.toJS().notification).to.have.property('message', 'Create Fail')
        expect(state.toJS().notification).to.have.property('type', 'error')
      })
    })
  })

  describe('Edit', () => {
    let state
    beforeEach(() => {
      state = CrudRecord(rawInitialState)
      state = loadEntities({ moduleName, state, reducer, data })
    })

    function clickEdit() {
      it('click edit', () => {
        state = reducer(state, { type: EDIT })
        state = reducer(state, { type: LOAD_DETAIL_SUCCESS, payload: edited })
        expect(state.toJS()).to.have.property('isEdit', true)
        expect(state.toJS().selected).to.deep.equal(edited)
      })
    }

    function startSubmitEdit() {
      it('start submit', () => {
        state = reducer(state, { type: SUBMIT_EDIT_START })
        expect(state.toJS()).to.have.property('isSubmittingEdit', true)
      })
    }

    describe('Edit success', () => {
      clickEdit()
      startSubmitEdit()

      it('submit success', () => {
        state = reducer(state, { type: SUBMIT_EDIT_SUCCESS, payload: { slug: 'category-01', name: 'Category 01' } })
        expect(state.toJS()).to.have.property('isEdit', false)
        expect(state.toJS()).to.have.property('isSubmittingEdit', false)

        expect(state.toJS()).to.have.property('notification')
        expect(state.toJS().notification).to.have.property('message', 'Save Successfully')
        expect(state.toJS().notification).to.have.property('type', 'info')
      })
    })

    describe('Cancel edit', () => {
      clickEdit()

      it('cancel', () => {
        state = reducer(state, { type: CANCEL_EDIT })
        expect(state.toJS()).to.have.property('isEdit', false)
        expect(state.toJS()).to.have.property('selected', null)
      })
    })

    describe('Edit fail', () => {
      clickEdit()
      startSubmitEdit()

      it('submit fail', () => {
        state = reducer(state, { type: SUBMIT_EDIT_FAIL, payload: error })
        expect(state.toJS()).to.have.property('isEdit', false)
        expect(state.toJS()).to.have.property('isSubmittingEdit', false)
        expect(state.toJS()).to.have.property('selected', null)

        expect(state.toJS()).to.have.property('notification')
        expect(state.toJS().notification).to.have.property('message', 'Save Fail')
        expect(state.toJS().notification).to.have.property('type', 'error')
      })
    })
  })

  describe('Remove', () => {
    let state
    beforeEach(() => {
      state = CrudRecord(rawInitialState)
      state = loadEntities({ moduleName, state, reducer, data })
    })

    function clickRemove() {
      it('click remove', () => {
        state = reducer(state, { type: REMOVE, payload: _id })
        expect(state.toJS()).to.have.property('isRemove', true)
        expect(state.toJS().selected).to.deep.equal(edited)
      })
    }

    function startRemove() {
      it('start submit', () => {
        state = reducer(state, { type: SUBMIT_REMOVE_START })
        expect(state.toJS()).to.have.property('isSubmittingRemove', true)
      })
    }

    describe('Cancel Remove', () => {
      clickRemove()

      it('cancel remove', () => {
        state = reducer(state, { type: CANCEL_REMOVE })
        expect(state.toJS()).to.have.property('isRemove', false)
        expect(state.toJS()).to.have.property('selected', null)
      })
    })

    describe('Remove success', () => {
      clickRemove()
      startRemove()

      it('submit success', () => {
        state = reducer(state, { type: SUBMIT_REMOVE_SUCCESS, payload: removed })
        expect(state.toJS()).to.have.property('isRemove', false)
        expect(state.toJS()).to.have.property('isSubmittingRemove', false)
        expect(state.toJS()).to.have.property('selected', null)

        expect(state.toJS()).to.have.property('notification')
        expect(state.toJS().notification).to.have.property('message', 'Remove Successfully')
        expect(state.toJS().notification).to.have.property('type', 'info')

        expect(Object.keys(state.toJS().entities)).to.have.property('length', 9)
        expect(state.toJS().result).to.have.property('length', 9)
        expect(state.toJS()).to.have.property('count', 13) // decrease count
      })
    })

    describe('Remove fail', () => {
      clickRemove()
      startRemove()

      it('submit fail', () => {
        state = reducer(state, { type: SUBMIT_REMOVE_FAIL, payload: error })
        expect(state.toJS()).to.have.property('isRemove', false)
        expect(state.toJS()).to.have.property('isSubmittingRemove', false)
        expect(state.toJS()).to.have.property('selected', null)

        expect(state.toJS()).to.have.property('notification')
        expect(state.toJS().notification).to.have.property('message', 'Remove Fail')
        expect(state.toJS().notification).to.have.property('type', 'error')
      })
    })
  })
})
