/* eslint-disable new-cap */
// @flow

import { Record } from 'immutable'
import chai from 'chai'
import createQueryConstants from '../create-query-constants'
import createQueryReducer from '../create-query-reducer.js'
import { rawInitialState } from '../initial-state.js'
import data from './test-data/categories.json'
import dataMore from './test-data/categories-more.json'
import filterGuide from './test-data/filter-guide.json'
import detail from './test-data/categoryDetail.json'
import { loadEntities } from './helpers'

chai.use(require('chai-things'))
const { expect } = chai

const moduleName = 'post-category'
const constants = createQueryConstants(moduleName)
const reducer = createQueryReducer(constants)
const error = { message: 'Some error' }

const {
  LOAD_ENTITIES_START,
  LOAD_ENTITIES_SUCCESS,
  LOAD_ENTITIES_FAIL,
  LOAD_MORE_START,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_FAIL,

  LOAD_DETAIL_START,
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_FAIL,
  CLOSE_DETAIL,

  SHOW_FILTER_GUIDE_START,
  SHOW_FILTER_GUIDE_SUCCESS,
  SHOW_FILTER_GUIDE_FAIL,
  CLOSE_FILTER_GUIDE,

  CHANGE_FILTER_STRING,
  DISMISS_NOTIFICATION,
} = constants

const CrudRecord = Record(rawInitialState)

describe('Query Reducer', () => {
  describe('Show / hide filter guide success', () => {
    let state = CrudRecord(rawInitialState)     // Force create new state

    it('start', () => {
      state = reducer(state, { type: SHOW_FILTER_GUIDE_START })
      expect(state.toJS()).to.have.property('isLoadingFilterGuide', true)
    })

    it('success', () => {
      state = reducer(state, { type: SHOW_FILTER_GUIDE_SUCCESS, payload: filterGuide })

      expect(state.toJS()).to.have.property('isLoadingFilterGuide', false)
      expect(state.toJS()).to.have.property('error', null)

      expect(state.toJS()).to.have.property('isShowFilterGuide', true)

      expect(state.toJS()).to.have.property('filterFields')
      expect(state.toJS().filterFields).to.all.have.property('filterField')
      expect(state.toJS().filterFields).to.all.have.property('compareType')
      expect(state.toJS().filterFields).to.all.have.property('dbType')
    })

    it('hide filter guide', () => {
      state = reducer(state, { type: CLOSE_FILTER_GUIDE })
      expect(state.toJS()).to.have.property('isShowFilterGuide', false)
    })
  })

  describe('Show filter guide fail', () => {
    let state = CrudRecord(rawInitialState)

    it('start', () => {
      state = reducer(state, { type: SHOW_FILTER_GUIDE_START })
      expect(state.toJS()).to.have.property('isLoadingFilterGuide', true)
    })

    it('fail', () => {
      state = reducer(state, { type: SHOW_FILTER_GUIDE_FAIL, payload: error })

      expect(state.toJS()).to.have.property('isLoadingFilterGuide', false)
      expect(state.toJS()).to.have.property('isShowFilterGuide', false)
      expect(state.toJS()).to.have.property('filterFields').to.deep.equal([])
      expect(state.toJS().error).to.deep.equal(error)
    })
  })

  describe('Change filterString', () => {
    it('success', () => {
      let state = CrudRecord(rawInitialState)
      state = reducer(state, { type: CHANGE_FILTER_STRING, payload: 'q=hello' })
      expect(state.toJS()).to.have.property('filterString', 'q=hello')
    })
  })

  describe('Load entities success', () => {
    let state = CrudRecord(rawInitialState)
    it('start', () => {
      state = reducer(state, { type: LOAD_ENTITIES_START })
      expect(state.toJS()).to.have.property('isLoading', true)
    })

    it('success', () => {
      state = reducer(state, { type: LOAD_ENTITIES_SUCCESS, payload: data })
      expect(state.toJS()).to.have.property('isLoading', false)
      expect(state.toJS()).to.have.property('error', null)

      expect(state.toJS()).to.have.property('count')
      expect(state.toJS().query).to.have.property('page', 1)
      expect(state.toJS().query).to.have.property('limit', 10)
      expect(Object.keys(state.toJS().entities)).to.have.property('length', 10)
    })
  })

  describe('Load entities fail', () => {
    let state = CrudRecord(rawInitialState)

    it('start', () => {
      state = reducer(state, { type: LOAD_ENTITIES_START })
      expect(state.toJS()).to.have.property('isLoading', true)
    })

    it('fail', () => {
      state = reducer(state, { type: LOAD_ENTITIES_FAIL, payload: error })
      expect(state.toJS()).to.have.property('isLoading', false)
      expect(state.toJS().error).to.have.deep.equal(error)
    })
  })

  describe('Load more fail', () => {
    let state = CrudRecord(rawInitialState)
    state = loadEntities({ moduleName, state, reducer, data })

    it('start', () => {
      state = reducer(state, { type: LOAD_MORE_START })
      expect(state.toJS()).to.have.property('isLoadingMore', true)
    })

    it('fail', () => {
      state = reducer(state, { type: LOAD_MORE_FAIL, payload: error })
      expect(state.toJS()).to.have.property('isLoadingMore', false)
      expect(state.toJS().error).to.equal(error)
    })
  })

  describe('Load more success', () => {
    let state = CrudRecord(rawInitialState)
    state = loadEntities({ moduleName, state, reducer, data })

    it('start', () => {
      state = reducer(state, { type: LOAD_MORE_START })
      expect(state.toJS()).to.have.property('isLoadingMore', true)
    })

    it('success', () => {
      state = reducer(state, { type: LOAD_MORE_SUCCESS, payload: dataMore })

      expect(state.toJS()).to.have.property('isLoadingMore', false)
      expect(state.toJS()).to.have.property('error', null)

      expect(state.toJS()).to.have.property('query')
      expect(state.toJS()).to.have.property('count')
      expect(state.toJS().query).to.have.property('page', 2)
      expect(state.toJS().query).to.have.property('limit', 10)
      expect(Object.keys(state.toJS().entities)).to.have.property('length', 14)
    })

    /* Remove because use result to set order
    it('keep ordered', () => {
      const expectEntities = [...data.entities, ...dataMore.entities]
      const entities = reduce(state.toJS().entities, (acc, value) => [...acc, value], [])
      expect(entities).to.deep.equal(expectEntities)
    })
    */
  })

  describe('Load detail success', () => {
    let state = CrudRecord(rawInitialState)
    state = loadEntities({ moduleName, state, reducer, data })

    it('start', () => {
      // Load & show
      state = reducer(state, { type: LOAD_DETAIL_START, payload: { show: true } })
      expect(state.toJS()).to.have.property('isLoadingDetail', true)
      expect(state.toJS()).to.have.property('isShowDetail', true)
    })

    it('success', () => {
      // Load & show
      state = reducer(state, { type: LOAD_DETAIL_SUCCESS, payload: detail })
      expect(state.toJS()).to.have.property('isLoadingDetail', false)
      expect(state.toJS()).to.have.property('isShowDetail', true)
      expect(state.toJS()).to.have.property('selected', detail)
    })

    it('close detail', () => {
      // Load & show
      state = reducer(state, { type: CLOSE_DETAIL })
      expect(state.toJS()).to.have.property('isShowDetail', false)
      expect(state.toJS()).to.have.property('selected', null)
    })
  })

  describe('Load detail fail', () => {
    let state = CrudRecord(rawInitialState)
    state = loadEntities({ moduleName, state, reducer, data })

    it('start', () => {
      // Load & show
      state = reducer(state, { type: LOAD_DETAIL_START, payload: { show: true } })
      expect(state.toJS()).to.have.property('isLoadingDetail', true)
      expect(state.toJS()).to.have.property('isShowDetail', true)
    })

    it('fail', () => {
      // Load & show
      state = reducer(state, { type: LOAD_DETAIL_FAIL, payload: error })
      expect(state.toJS()).to.have.property('isLoadingDetail', false)
      expect(state.toJS()).to.have.property('isShowDetail', false)
      expect(state.toJS()).to.have.property('selected', null)
      expect(state.toJS()).to.have.property('error', error)
    })
  })

  describe('Dismiss notification', () => {
    // Assume it has notificationMessage
    let state = CrudRecord({
      ...rawInitialState,
      notification: {
        message: 'Add Successfully',
        style: 'info',
      },
    })

    it('success', () => {
      state = reducer(state, { type: DISMISS_NOTIFICATION })
      expect(state.toJS()).to.have.property('notification', null)
    })
  })
})
