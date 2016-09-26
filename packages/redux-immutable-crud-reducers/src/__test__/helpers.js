// @flow

import { createQueryConstants } from 'redux-immutable-crud-actions'

type LoadEntitiesParams = {
  moduleName: string,
  state: Record<CrudState<any>>,
  // reducer: (state: Record<CrudState<any>>, action: ReduxAction) => Record<CrudState<any>>,
  reducer: Function,
  data: any,
 }

export function loadEntities({ moduleName, state, reducer, data }: LoadEntitiesParams) {
  const {
    LOAD_ENTITIES_START, LOAD_ENTITIES_SUCCESS,
  } = createQueryConstants(moduleName)

  let nextState = reducer(state, { type: LOAD_ENTITIES_START })
  nextState = reducer(state, { type: LOAD_ENTITIES_SUCCESS, payload: data })
  return nextState
}
