/* eslint-disable new-cap */
// @flow

import { Record, OrderedMap } from 'immutable'
import { initialState } from './initial-state'

export default function createReducer(constants: { [key: string]: string }) {
  const {
    keyField,
    LOAD_ENTITIES_START, LOAD_ENTITIES_SUCCESS, LOAD_ENTITIES_FAIL,
    LOAD_MORE_START, LOAD_MORE_SUCCESS, LOAD_MORE_FAIL,
    LOAD_DETAIL_START, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL, CLOSE_DETAIL,
    SHOW_FILTER_GUIDE_START, SHOW_FILTER_GUIDE_SUCCESS, SHOW_FILTER_GUIDE_FAIL,
    CLOSE_FILTER_GUIDE,
    CHANGE_FILTER_STRING,
    DISMISS_NOTIFICATION,
  } = constants

  return function reducer(state: Record<CrudState<any>> = initialState, action: ReduxAction = {}): Record<CrudState<any>> {
    const { entities, count, fields, ...query } = action.payload || {}
    const result = entities && entities.map((entity) => (entity[keyField]))
    const entitiesMap = entities && entities.reduce((acc, value) => ({ ...acc, [value[keyField]]: value }), {})

    switch (action.type) {
      case LOAD_ENTITIES_START:
        return state
          .set('isLoading', true)

      case LOAD_ENTITIES_SUCCESS:
        return state
          .set('isLoading', false)
          .set('entities', OrderedMap(entitiesMap))
          .set('result', result)
          .set('query', query)
          .set('count', count)
          .set('hasMore', count > (query.page) * query.limit)
          .set('error', null)

      case LOAD_ENTITIES_FAIL:
        return state
          .set('isLoading', false)
          .set('error', action.payload)

      case LOAD_MORE_START:
        return state
          .set('isLoadingMore', true)
          .set('error', action.payload)

      case LOAD_MORE_SUCCESS:
        return state
          .set('isLoadingMore', false)
          .mergeIn(['entities'], entitiesMap)
          .update('result',
            (value) => value.concat(result)
          )
          .set('query', query)
          .set('hasMore', count > (query.page) * query.limit)
          .set('error', null)

      case LOAD_MORE_FAIL:
        return state
          .set('isLoadingMore', false)
          .set('error', action.payload)
          .set('selected', null)
          .set('isEdit', false)

      case LOAD_DETAIL_START:
        return state
          .set('isLoadingDetail', true)
          .set('isShowDetail', true)

      case LOAD_DETAIL_SUCCESS:
        return state
          .set('isLoadingDetail', false)
          .set('selected', action.payload)
          .set('error', null)

      case LOAD_DETAIL_FAIL:
        return state
          .set('isLoadingDetail', false)
          .set('selected', null)
          .set('isShowDetail', false)
          .set('selected', null)
          .set('error', action.payload)

      case CLOSE_DETAIL:
        return state
          .set('selected', null)
          .set('isShowDetail', false)

      case SHOW_FILTER_GUIDE_START:
        return state
          .set('isLoadingFilterGuide', true)

      case SHOW_FILTER_GUIDE_SUCCESS:
        return state
          .set('filterFields', fields)
          .set('isShowFilterGuide', true)
          .set('isLoadingFilterGuide', false)

      case SHOW_FILTER_GUIDE_FAIL:
        return state
          .set('error', action.payload)
          .set('filterFields', [])
          .set('isShowFilterGuide', false)
          .set('isLoadingFilterGuide', false)

      case CLOSE_FILTER_GUIDE:
        return state
          .set('isShowFilterGuide', false)

      case CHANGE_FILTER_STRING:
        return state
          .set('filterString', action.payload)

      case DISMISS_NOTIFICATION:
        return state
          .set('notification', null)
      default:
        return state
    }
  }
}
