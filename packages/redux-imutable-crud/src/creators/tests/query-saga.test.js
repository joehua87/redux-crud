import { expect } from 'chai'
import { createAction } from 'redux-actions'
import createQueryConstants from '../create-query-constants'
import createQueryActions from '../create-query-actions'
import createQuerySagas from '../create-query-sagas'
// import { LOCATION_CHANGE } from 'react-router-redux'
import { race, take, call, put, select } from 'redux-saga/effects'
import request from '../../utils/request'

const constants = createQueryConstants('postCategory')
const actions = createQueryActions({ constants })

let querySagas

const state = {
  query: {
    filter: {
      q: 'hello',
    },
    page: 1,
  }
}

// Mock selectState, return initial state with page = 1
const selectState = () => state

describe('Create Query Sagas', () => {
  querySagas = createQuerySagas({
    constants,
    endpoint: 'http://localhost/post-category',
    selectState,
  })

  it('success', () => {
    expect(querySagas).to.have.property('loadEntitiesSaga')
    expect(querySagas).to.have.property('loadMoreSaga')
    expect(querySagas).to.have.property('loadDetailSaga')
    expect(querySagas).to.have.property('showFilterGuideSaga')
    expect(querySagas).to.have.property('list')
  })
})

const requestArgs = {
  method: 'get',
  params: {
    filter: { q: 'hello' },
    sort: 'slug'
  },
}

const loadMoreArgs = {
  method: 'get',
  params: {
    filter: { q: 'hello' },
    page: 2,
  },
}

const loadDetailArgs = {
  method: 'get',
  params: {},
}

describe('loadEntitiesSaga', () => {
  const loadEntitiesSaga = querySagas.loadEntitiesSaga

  function commonStep(generator) {
    let next

    it('race', () => {
      next = generator.next()
      const expectedNextCall = race({
        load: take(constants.LOAD_ENTITIES_START),
        // stop: take(LOCATION_CHANGE),
      })
      expect(next.value).to.deep.equal(expectedNextCall)
    })

    it('receive LOAD_ENTITIES_START', () => {
      next = generator.next({ load: actions.loadEntities({ filter: { q: 'hello' }, sort: 'slug' }) })
      const expectedNextCall = call(request, 'http://localhost/post-category/query', requestArgs)
      expect(next.value).to.deep.equal(expectedNextCall)
    })

    return next
  }

  describe('success', () => {
    const generator = loadEntitiesSaga()
    let next = commonStep(generator)

    it('put data', () => {
      const payload = { entities: [] }
      next = generator.next({ data: payload }) // success case
      const expectedNextCall = put(createAction(constants.LOAD_ENTITIES_SUCCESS)(payload))
      expect(next.value).to.deep.equal(expectedNextCall)
    })
  })

  describe('error', () => {
    const generator = loadEntitiesSaga()
    let next = commonStep(generator)

    it('put error', () => {
      const err = { message: 'some error' }
      next = generator.next({ err }) // success case
      const expectedNextCall = put(createAction(constants.LOAD_ENTITIES_FAIL)(err))
      expect(next.value).to.deep.equal(expectedNextCall)
    })
  })
})

describe('loadMoreSaga', () => {
  const loadMoreSaga = querySagas.loadMoreSaga

  function commonStep(generator) {
    let next

    it('race', () => {
      next = generator.next()

      const expectedRace = race({
        load: take(constants.LOAD_MORE_START),
        // stop: take(LOCATION_CHANGE),
      })

      expect(next.value).to.deep.equal(expectedRace)
    })

    it('receive LOAD_MORE_START', () => {
      next = generator.next({ load: actions.loadMore() })
      const expectedNextCall = select(selectState)
      expect(next.value).to.deep.equal(expectedNextCall)
    })

    it('select State', () => {
      next = generator.next(state)
      const expectedNextCall = call(request, 'http://localhost/post-category/query', loadMoreArgs)
      expect(next.value).to.deep.equal(expectedNextCall)
    })

    return next
  }

  describe('success', () => {
    const generator = loadMoreSaga()
    let next = commonStep(generator)

    it('put data', () => {
      const payload = { entities: [] }
      next = generator.next({ data: payload }) // success case
      const expectPut = put(createAction(constants.LOAD_MORE_SUCCESS)(payload))
      expect(next.value).to.deep.equal(expectPut)
    })
  })

  describe('error', () => {
    const generator = loadMoreSaga()
    let next = commonStep(generator)

    it('put error', () => {
      const err = { message: 'some error' }
      next = generator.next({ err }) // success case
      const expectPut = put(createAction(constants.LOAD_MORE_FAIL)(err))
      expect(next.value).to.deep.equal(expectPut)
    })
  })
})

describe('loadDetailSaga', () => {
  const loadDetailSaga = querySagas.loadDetailSaga

  function commonStep(generator) {
    let next

    it('race', () => {
      next = generator.next()

      const expectedRace = race({
        load: take(constants.LOAD_DETAIL_START),
        // stop: take(LOCATION_CHANGE),
      })

      expect(next.value).to.deep.equal(expectedRace)
    })

    it('receive LOAD_DETAIL_START', () => {
      next = generator.next({ load: actions.loadDetail('some-id') })
      const expectedNextCall = call(request, 'http://localhost/post-category/id/some-id', loadDetailArgs)
      expect(next.value).to.deep.equal(expectedNextCall)
    })

    return next
  }

  describe('success', () => {
    const generator = loadDetailSaga()
    let next = commonStep(generator)

    it('put data', () => {
      const payload = {}
      next = generator.next({ data: payload }) // success case
      const expectPut = put(createAction(constants.LOAD_DETAIL_SUCCESS)(payload))
      expect(next.value).to.deep.equal(expectPut)
    })
  })

  describe('error', () => {
    const generator = loadDetailSaga()
    let next = commonStep(generator)

    it('put error', () => {
      const err = { message: 'some error' }
      next = generator.next({ err }) // success case
      const expectPut = put(createAction(constants.LOAD_DETAIL_FAIL)(err))
      expect(next.value).to.deep.equal(expectPut)
    })
  })
})

describe('showFilterGuideSaga', () => {

})
