// @flow

import createRequestSaga from './create-request-saga'
import createQuerySagas from './create-query-sagas'

export default function createEditableSaga({
  constants,
  endpoint,
  headers,
  selectState,
  listProjection,
  detailProjection,
}: CreateListSagaParams): EditableSaga {
  const {
    CREATE_START,
    CREATE_SUCCESS,
    CREATE_FAIL,
    SUBMIT_ADD_START,
    SUBMIT_ADD_SUCCESS,
    SUBMIT_ADD_FAIL,
    SUBMIT_EDIT_START,
    SUBMIT_EDIT_SUCCESS,
    SUBMIT_EDIT_FAIL,
    SUBMIT_REMOVE_START,
    SUBMIT_REMOVE_SUCCESS,
    SUBMIT_REMOVE_FAIL,
  } = constants

  const querySagas = createQuerySagas({
    constants,
    endpoint,
    headers,
    selectState,
    listProjection,
    detailProjection,
  })

  const submitEditSaga = createRequestSaga({
    types: [SUBMIT_EDIT_START, SUBMIT_EDIT_SUCCESS, SUBMIT_EDIT_FAIL],
    method: 'put',
    url: `${endpoint}/validate-update`,
    headers,
    data: ({ payload }) => payload,
  })

  const submitAddSaga = createRequestSaga({
    types: [SUBMIT_ADD_START, SUBMIT_ADD_SUCCESS, SUBMIT_ADD_FAIL],
    method: 'post',
    url: endpoint,
    headers,
    data: ({ payload }) => payload,
  })

  const createSaga = createRequestSaga({
    types: [CREATE_START, CREATE_SUCCESS, CREATE_FAIL],
    method: 'post',
    url: `${endpoint}/create`,
    headers,
    data: ({ payload }) => payload,
  })

  const submitRemoveSaga = createRequestSaga({
    types: [SUBMIT_REMOVE_START, SUBMIT_REMOVE_SUCCESS, SUBMIT_REMOVE_FAIL],
    method: 'delete',
    headers,
    url: ({ payload }) => `${endpoint}/delete/${payload}`,
  })

  // Return object for easier testing each function
  return {
    submitAddSaga,
    submitEditSaga,
    submitRemoveSaga,
    createSaga,
    list: [
      ...querySagas.list,
      submitAddSaga,
      submitEditSaga,
      submitRemoveSaga,
      createSaga,
    ],
  }
}
