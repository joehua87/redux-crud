/* eslint-disable new-cap */
// @flow

import { Record } from 'immutable'

export const rawInitialState: CrudState<any> = {
  isLoading: false,
  isLoadingFilterGuide: false,
  isLoadingDetail: false,
  isLoadingMore: false,
  entities: {},
  result: [],
  filterString: '',
  query: {
    page: 0,
  },
  count: 0,
  hasMore: false,
  selected: null,
  isShowDetail: false,
  isEdit: false,
  isRemove: false,
  isSubmittingEdit: false,
  isSubmittingRemove: false,
  filterFields: [],
  isShowFilterGuide: false,
  error: null,
  notification: {
    type: 'info',
    message: '',
  },
}
export const CrudRecord = Record(rawInitialState)
export const initialState = CrudRecord(rawInitialState)
