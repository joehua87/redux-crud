// @flow

import { createAction } from 'redux-actions'
import createEditableConstants from './create-editable-constants'
import createQueryActions from './create-query-actions'

export default function createEditableActions(moduleName: string) {
  const {
    CREATE_START,
    EDIT, CANCEL_EDIT,
    SUBMIT_EDIT_START,
    ADD, CANCEL_ADD,
    SUBMIT_ADD_START,
    REMOVE, CANCEL_REMOVE,
    SUBMIT_REMOVE_START,
  } = createEditableConstants(moduleName)

  const queryActions = createQueryActions(moduleName)

  return {
    ...queryActions,
    create: createAction(CREATE_START),
    add: createAction(ADD),
    submitAdd: createAction(SUBMIT_ADD_START),
    cancelAdd: createAction(CANCEL_ADD),

    edit: createAction(EDIT),
    submitEdit: createAction(SUBMIT_EDIT_START),
    cancelEdit: createAction(CANCEL_EDIT),

    remove: createAction(REMOVE),
    submitRemove: createAction(SUBMIT_REMOVE_START),
    cancelRemove: createAction(CANCEL_REMOVE),
  }
}
