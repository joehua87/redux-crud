/* eslint-disable no-underscore-dangle, new-cap */
// @flow

import createQueryReducer from './create-query-reducer'
import { initialState } from './initial-state'

export default function createEditableReducer(constants: { [key: string]: string }) {
  const {
    keyField,
    CREATE_START, CREATE_SUCCESS, CREATE_FAIL,
    EDIT, CANCEL_EDIT,
    SUBMIT_EDIT_START, SUBMIT_EDIT_SUCCESS, SUBMIT_EDIT_FAIL,
    ADD, CANCEL_ADD,
    SUBMIT_ADD_START, SUBMIT_ADD_SUCCESS, SUBMIT_ADD_FAIL,
    REMOVE, CANCEL_REMOVE,
    SUBMIT_REMOVE_START, SUBMIT_REMOVE_SUCCESS, SUBMIT_REMOVE_FAIL,
  } = constants

  return function reducer(state: Map<string, any> = initialState, action: ReduxAction = {}): Map<string, any> {
    const payload = action.payload || {}
    switch (action.type) {
      case CREATE_START:
        return state
          .set('isSubmittingEdit', true)
      case CREATE_SUCCESS:
        return state
          .update('result',
            (value) => value.concat(payload[keyField])
          )
          .update('count', (count) => count + 1)
          .set('isSubmittingEdit', false)
          .set('selected', payload)
          .mergeIn(['entities'], { [payload[keyField]]: payload })
          .set('notification', {
            message: 'Create Successfully',
            type: 'info',
          })

      case CREATE_FAIL:
        return state
          .set('isSubmittingEdit', false)
          .set('notification', {
            message: 'Create Fail',
            type: 'error',
          })

      case EDIT:
        // Use sagas to load detail, so don't need to set selected here
        return state
          .set('isEdit', true)

      case ADD:
        return state
          .set('isEdit', true)
          .set('selected', {})

      case SUBMIT_ADD_START:
      case SUBMIT_EDIT_START:
        return state
          .set('isSubmittingEdit', true)

      case SUBMIT_EDIT_SUCCESS:
        return state
          .set('isSubmittingEdit', false)
          .set('selected', payload)
          .set('notification', {
            message: 'Save Successfully',
            type: 'info',
          })
          .mergeIn(['entities', payload[keyField]], payload)

      case SUBMIT_EDIT_FAIL:
        return state
          .set('isSubmittingEdit', false)
          .set('notification', {
            message: 'Save Fail',
            type: 'error',
          })

      case SUBMIT_ADD_SUCCESS:
        return state
          .update('result',
            (value) => value.concat(payload[keyField])
          )
          .update('count', (count) => count + 1)
          .set('isSubmittingEdit', false)
          .set('isEdit', false)
          .set('selected', payload)
          .mergeIn(['entities'], { [payload[keyField]]: payload })
          .set('notification', {
            message: 'Add Successfully',
            type: 'info',
          })

      case SUBMIT_ADD_FAIL:
        return state
          .set('isEdit', false)
          .set('isSubmittingEdit', false)
          .set('notification', {
            message: 'Add Fail',
            type: 'error',
          })

      case CANCEL_ADD:
      case CANCEL_EDIT:
        return state
          .set('isEdit', false)
          .set('selected', null)

      case REMOVE:
        return state
          .set('isRemove', true)
          .set('selected', state.getIn(['entities', payload]))

      case CANCEL_REMOVE:
        return state
          .set('isRemove', false)
          .set('selected', null)

      case SUBMIT_REMOVE_START:
        return state
          .set('isSubmittingRemove', true)

      case SUBMIT_REMOVE_SUCCESS:
        return state
          .update('result',
            (value) => value.filter((_id) => _id !== payload[keyField]) // TODO Refactor me
          )
          .update('count', (count) => count - 1)
          .set('isRemove', false)
          .set('isSubmittingRemove', false)
          .deleteIn(['entities', payload[keyField]])
          .set('notification', {
            message: 'Remove Successfully',
            type: 'info',
          })
          .set('selected', null)

      case SUBMIT_REMOVE_FAIL:
        return state
          .set('isRemove', false)
          .set('isSubmittingRemove', false)
          .set('selected', null)
          .set('notification', {
            message: 'Remove Fail',
            type: 'error',
          })

      default:
        return createQueryReducer(constants)(state, action)
    }
  }
}
