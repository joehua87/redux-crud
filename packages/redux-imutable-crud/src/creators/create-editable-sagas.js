import { take, put } from 'redux-saga/effects'
import createRequestSaga from './create-request-saga'
import createQuerySagas from './create-query-sagas'
import createQueryActions from './create-query-actions'

export default function createEditableSaga({
  constants,
  endpoint,
  selectState,
  listProjection,
  detailProjection,
}) {
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
    EDIT,
    SUBMIT_REMOVE_START,
    SUBMIT_REMOVE_SUCCESS,
    SUBMIT_REMOVE_FAIL,
  } = constants

  const {
    loadDetail,
  } = createQueryActions(constants)

  const querySagas = createQuerySagas({
    constants,
    endpoint,
    selectState,
    listProjection,
    detailProjection,
  })

  const submitEditSaga = createRequestSaga({
    types: [SUBMIT_EDIT_START, SUBMIT_EDIT_SUCCESS, SUBMIT_EDIT_FAIL],
    method: 'put',
    url: `${endpoint}/validate-update`,
    data: ({ payload }) => payload,
  })

  const submitAddSaga = createRequestSaga({
    types: [SUBMIT_ADD_START, SUBMIT_ADD_SUCCESS, SUBMIT_ADD_FAIL],
    method: 'post',
    url: endpoint,
    data: ({ payload }) => payload,
  })

  const createSaga = createRequestSaga({
    types: [CREATE_START, CREATE_SUCCESS, CREATE_FAIL],
    method: 'post',
    url: `${endpoint}/create`,
    data: ({ payload }) => payload,
  })

  const submitRemoveSaga = createRequestSaga({
    types: [SUBMIT_REMOVE_START, SUBMIT_REMOVE_SUCCESS, SUBMIT_REMOVE_FAIL],
    method: 'delete',
    url: ({ payload }) => `${endpoint}/delete/${payload}`,
  })

  function* editSaga() {
    while (true) { // eslint-disable-line no-constant-condition
      const editAction = yield take(EDIT)
      yield put(loadDetail(editAction.payload))
    }
  }

  // Return object for easier testing each function
  return {
    submitAddSaga,
    submitEditSaga,
    submitRemoveSaga,
    createSaga,
    editSaga,
    list: [
      ...querySagas.list,
      submitAddSaga,
      submitEditSaga,
      submitRemoveSaga,
      createSaga,
      editSaga,
    ],
  }
}
