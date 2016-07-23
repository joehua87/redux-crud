// @flow

import { take, call, put, race, select } from 'redux-saga/effects'
import omitBy from 'lodash/omitBy'
// import { LOCATION_CHANGE } from 'react-router-redux'
import request from '../utils/request'
import { createAction } from 'redux-actions'

const debug = require('debug')('redux-immutable-crud:create-request-saga')

type CreateRequestSagaParams = {
  types: Array<string>,
  method: string,
  url: string | () => string,
  headers: { [key:string]: any },
  params: { [key:string]: any },
  data: any,
  selectState: Function,
}

/**
 *
 * @param types
 * @param method
 * @param url
 * @param headers
 * @param params
 * @param data
 * @param selectState
 * @returns {Function}
 */
export default function createRequestSaga({ types, method, url, headers, params, data, selectState }: CreateRequestSagaParams):Function {
  return function*() { // eslint-disable-line func-names
    const [START, SUCCESS, FAIL] = types
    const success = createAction(SUCCESS)
    const fail = createAction(FAIL)

    while (true) { // eslint-disable-line no-constant-condition
      const watcher = yield race({
        load: take(START),
        // stop: take(LOCATION_CHANGE), // stop watching if user leaves page
      })

      debug('Race Watcher', watcher)

      if (!watcher || watcher.stop) break

      let state = null
      if (selectState) {
        state = yield select(selectState)
        debug('State', state)
      }

      const payload = watcher.load && watcher.load.payload

      let finalUrl = url
      if (typeof url === 'function') {
        finalUrl = url({ payload, state })
      }

      let finalParams = params
      if (typeof params === 'function') {
        finalParams = params({ payload, state })
      }

      let finalData = data
      if (typeof data === 'function') {
        finalData = data({ payload, state })
      }

      const options = omitBy({
        method,
        params: finalParams,
        data: finalData,
      }, (prop) => !prop) // Keep only has value property

      if (headers) options.headers = headers

      // Should race here, between waiting for request & location changed
      const response = yield call(request, finalUrl, options)
      debug('Response', response)

      // We return an object in a specific format, see utils/request.js for more information
      if (!response) {
        yield put(fail(new Error('Cannot get response')))
      } else if (response && !response.err) {
        yield put(success(response.data))
      } else {
        // debug(response.err) // eslint-disable-line no-console
        yield put(fail(response.err))
      }
    }
  }
}
