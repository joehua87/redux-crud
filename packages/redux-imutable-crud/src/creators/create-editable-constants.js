import createQueryConstants from './create-query-constants';

export default function createEditableConstants(name, options = {}) {
  return {
    ...createQueryConstants(name, options),
    CREATE_START: `${name}/CREATE_START`,
    CREATE_SUCCESS: `${name}/CREATE_SUCCESS`,
    CREATE_FAIL: `${name}/CREATE_FAIL`,

    ADD: `${name}/ADD`,
    CANCEL_ADD: `${name}/CANCEL_ADD`,

    SUBMIT_ADD_START: `${name}/SUBMIT_ADD_START`,
    SUBMIT_ADD_SUCCESS: `${name}/SUBMIT_ADD_SUCCESS`,
    SUBMIT_ADD_FAIL: `${name}/SUBMIT_ADD_FAIL`,

    EDIT: `${name}/EDIT`,
    CANCEL_EDIT: `${name}/CANCEL_EDIT`,

    SUBMIT_EDIT_START: `${name}/SUBMIT_EDIT_START`,
    SUBMIT_EDIT_SUCCESS: `${name}/SUBMIT_EDIT_SUCCESS`,
    SUBMIT_EDIT_FAIL: `${name}/SUBMIT_EDIT_FAIL`,

    REMOVE: `${name}/REMOVE`,
    CANCEL_REMOVE: `${name}/CANCEL_REMOVE`,

    SUBMIT_REMOVE_START: `${name}/SUBMIT_REMOVE_START`,
    SUBMIT_REMOVE_SUCCESS: `${name}/SUBMIT_REMOVE_SUCCESS`,
    SUBMIT_REMOVE_FAIL: `${name}/SUBMIT_REMOVE_FAIL`,
  };
}
