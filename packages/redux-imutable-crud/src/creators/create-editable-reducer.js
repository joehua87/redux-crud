/* eslint-disable no-underscore-dangle */

import createQueryReducer, { initialState } from './create-query-reducer';

export default function createEditableReducer(constants) {
  const {
    keyField,
    CREATE_START, CREATE_SUCCESS, CREATE_FAIL,
    EDIT, CANCEL_EDIT,
    SUBMIT_EDIT_START, SUBMIT_EDIT_SUCCESS, SUBMIT_EDIT_FAIL,
    ADD, CANCEL_ADD,
    SUBMIT_ADD_START, SUBMIT_ADD_SUCCESS, SUBMIT_ADD_FAIL,
    REMOVE, CANCEL_REMOVE,
    SUBMIT_REMOVE_START, SUBMIT_REMOVE_SUCCESS, SUBMIT_REMOVE_FAIL,
  } = constants;

  return (state = initialState, action) => {
    switch (action.type) {
      case CREATE_START:
        return state
          .set('isSubmittingEdit', true);
      case CREATE_SUCCESS:
        return state
          .set('isSubmittingEdit', false)
          .set('selected', action.payload)
          .set('query', { ...state.get('query'), count: state.get('query').count + 1 })
          .mergeIn(['entities'], { [action.payload[keyField]]: action.payload })
          .set('notification', {
            message: 'Create Successfully',
            style: 'info',
          });

      case CREATE_FAIL:
        return state
          .set('isSubmittingEdit', false)
          .set('notification', {
            message: 'Create Fail',
            style: 'error',
          });

      case EDIT:
        // Use sagas to load detail, so don't need to set selected here
        return state
          .set('isEdit', true);

      case ADD:
        return state
          .set('isEdit', true)
          .set('selected', {});

      case SUBMIT_ADD_START:
      case SUBMIT_EDIT_START:
        return state
          .set('isSubmittingEdit', true);

      case SUBMIT_EDIT_SUCCESS:
        return state
          .set('isSubmittingEdit', false)
          .set('selected', action.payload)
          .set('notification', {
            message: 'Save Successfully',
            style: 'info',
          })
          .mergeIn(['entities', action.payload[keyField]], action.payload);

      case SUBMIT_EDIT_FAIL:
        return state
          .set('isSubmittingEdit', false)
          .set('notification', {
            message: 'Save Fail',
            style: 'error',
          });

      case SUBMIT_ADD_SUCCESS:
        return state
          .set('isSubmittingEdit', false)
          .set('isEdit', false)
          .set('selected', action.payload)
          .set('query', { ...state.get('query'), count: state.get('query').count + 1 })
          .mergeIn(['entities'], { [action.payload[keyField]]: action.payload })
          .set('notification', {
            message: 'Add Successfully',
            style: 'info',
          });

      case SUBMIT_ADD_FAIL:
        return state
          .set('isEdit', false)
          .set('isSubmittingEdit', false)
          .set('notification', {
            message: 'Add Fail',
            style: 'error',
          });

      case CANCEL_ADD:
      case CANCEL_EDIT:
        return state
          .set('isEdit', false)
          .set('selected', null);

      case REMOVE:
        return state
          .set('isRemove', true)
          .set('selected', state.getIn(['entities', action.payload]));

      case CANCEL_REMOVE:
        return state
          .set('isRemove', false)
          .set('selected', null);

      case SUBMIT_REMOVE_START:
        return state
          .set('isSubmittingRemove', true);

      case SUBMIT_REMOVE_SUCCESS:
        return state
          .set('isRemove', false)
          .set('isSubmittingRemove', false)
          .set('query', { ...state.get('query'), count: state.get('query').count - 1 })
          .deleteIn(['entities', action.payload[keyField]])
          .set('notification', {
            message: 'Remove Successfully',
            style: 'info',
          })
          .set('selected', null);

      case SUBMIT_REMOVE_FAIL:
        return state
          .set('isRemove', false)
          .set('isSubmittingRemove', false)
          .set('selected', null)
          .set('notification', {
            message: 'Remove Fail',
            style: 'error',
          });

      default:
        return createQueryReducer(constants)(state, action);
    }
  };
}
