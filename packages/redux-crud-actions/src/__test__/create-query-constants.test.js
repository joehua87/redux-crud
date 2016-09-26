// @flow

import createQueryConstants from '../create-query-constants'
import { expect } from 'chai'

describe('Create Query Constants', () => {
  const constants = createQueryConstants('post')
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

    DISMISS_NOTIFICATION,
  } = constants

  it('Load', () => {
    expect(LOAD_ENTITIES_START).to.equal('post/LOAD_ENTITIES_START')
    expect(LOAD_ENTITIES_SUCCESS).to.equal('post/LOAD_ENTITIES_SUCCESS')
    expect(LOAD_ENTITIES_FAIL).to.equal('post/LOAD_ENTITIES_FAIL')
  })

  it('Load more', () => {
    expect(LOAD_MORE_START).to.equal('post/LOAD_MORE_START')
    expect(LOAD_MORE_SUCCESS).to.equal('post/LOAD_MORE_SUCCESS')
    expect(LOAD_MORE_FAIL).to.equal('post/LOAD_MORE_FAIL')
  })

  it('Load detail', () => {
    expect(LOAD_DETAIL_START).to.equal('post/LOAD_DETAIL_START')
    expect(LOAD_DETAIL_SUCCESS).to.equal('post/LOAD_DETAIL_SUCCESS')
    expect(LOAD_DETAIL_FAIL).to.equal('post/LOAD_DETAIL_FAIL')
    expect(CLOSE_DETAIL).to.equal('post/CLOSE_DETAIL')
  })

  it('Show filter', () => {
    expect(SHOW_FILTER_GUIDE_START).to.equal('post/SHOW_FILTER_GUIDE_START')
    expect(SHOW_FILTER_GUIDE_SUCCESS).to.equal('post/SHOW_FILTER_GUIDE_SUCCESS')
    expect(SHOW_FILTER_GUIDE_FAIL).to.equal('post/SHOW_FILTER_GUIDE_FAIL')
    expect(CLOSE_FILTER_GUIDE).to.equal('post/CLOSE_FILTER_GUIDE')
  })

  it('Misc', () => {
    expect(DISMISS_NOTIFICATION).to.equal('post/DISMISS_NOTIFICATION')
  })
})
