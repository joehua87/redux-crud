// @flow

import { createAction } from 'redux-actions'
import createQueryConstants from './create-query-constants'

export default function createActions(moduleName: string) {
  const {
    SELECT,
    LOAD_ENTITIES_START,
    LOAD_MORE_START,
    LOAD_DETAIL_START,
    CLOSE_DETAIL,
    SHOW_FILTER_GUIDE_START,
    DISMISS_NOTIFICATION,
    CHANGE_FILTER_STRING,
    CLOSE_FILTER_GUIDE,
  } = createQueryConstants(moduleName)

  return {
    select: createAction(SELECT),
    loadEntities: createAction(LOAD_ENTITIES_START),
    loadMore: createAction(LOAD_MORE_START),
    loadDetail: createAction(LOAD_DETAIL_START),
    closeDetail: createAction(CLOSE_DETAIL),
    showFilterGuide: createAction(SHOW_FILTER_GUIDE_START),
    closeFilterGuide: createAction(CLOSE_FILTER_GUIDE),
    changeFilterString: createAction(CHANGE_FILTER_STRING),
    dismissNotification: createAction(DISMISS_NOTIFICATION),
  }
}
