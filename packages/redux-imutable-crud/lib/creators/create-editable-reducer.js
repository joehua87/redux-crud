'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-underscore-dangle */

exports.default = createEditableReducer;

var _createQueryReducer = require('./create-query-reducer');

var _createQueryReducer2 = _interopRequireDefault(_createQueryReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createEditableReducer(constants) {
  var keyField = constants.keyField;
  var CREATE_START = constants.CREATE_START;
  var CREATE_SUCCESS = constants.CREATE_SUCCESS;
  var CREATE_FAIL = constants.CREATE_FAIL;
  var EDIT = constants.EDIT;
  var CANCEL_EDIT = constants.CANCEL_EDIT;
  var SUBMIT_EDIT_START = constants.SUBMIT_EDIT_START;
  var SUBMIT_EDIT_SUCCESS = constants.SUBMIT_EDIT_SUCCESS;
  var SUBMIT_EDIT_FAIL = constants.SUBMIT_EDIT_FAIL;
  var ADD = constants.ADD;
  var CANCEL_ADD = constants.CANCEL_ADD;
  var SUBMIT_ADD_START = constants.SUBMIT_ADD_START;
  var SUBMIT_ADD_SUCCESS = constants.SUBMIT_ADD_SUCCESS;
  var SUBMIT_ADD_FAIL = constants.SUBMIT_ADD_FAIL;
  var REMOVE = constants.REMOVE;
  var CANCEL_REMOVE = constants.CANCEL_REMOVE;
  var SUBMIT_REMOVE_START = constants.SUBMIT_REMOVE_START;
  var SUBMIT_REMOVE_SUCCESS = constants.SUBMIT_REMOVE_SUCCESS;
  var SUBMIT_REMOVE_FAIL = constants.SUBMIT_REMOVE_FAIL;


  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? _createQueryReducer.initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case CREATE_START:
        return state.set('isSubmittingEdit', true);
      case CREATE_SUCCESS:
        return state.set('isSubmittingEdit', false).set('selected', action.payload).set('query', _extends({}, state.get('query'), { count: state.get('query').count + 1 })).mergeIn(['entities'], _defineProperty({}, action.payload[keyField], action.payload)).set('notification', {
          message: 'Create Successfully',
          style: 'info'
        });

      case CREATE_FAIL:
        return state.set('isSubmittingEdit', false).set('notification', {
          message: 'Create Fail',
          style: 'error'
        });

      case EDIT:
        // Use sagas to load detail, so don't need to set selected here
        return state.set('isEdit', true);

      case ADD:
        return state.set('isEdit', true).set('selected', {});

      case SUBMIT_ADD_START:
      case SUBMIT_EDIT_START:
        return state.set('isSubmittingEdit', true);

      case SUBMIT_EDIT_SUCCESS:
        return state.set('isSubmittingEdit', false).set('selected', action.payload).set('notification', {
          message: 'Save Successfully',
          style: 'info'
        }).mergeIn(['entities', action.payload[keyField]], action.payload);

      case SUBMIT_EDIT_FAIL:
        return state.set('isSubmittingEdit', false).set('notification', {
          message: 'Save Fail',
          style: 'error'
        });

      case SUBMIT_ADD_SUCCESS:
        return state.set('isSubmittingEdit', false).set('isEdit', false).set('selected', action.payload).set('query', _extends({}, state.get('query'), { count: state.get('query').count + 1 })).mergeIn(['entities'], _defineProperty({}, action.payload[keyField], action.payload)).set('notification', {
          message: 'Add Successfully',
          style: 'info'
        });

      case SUBMIT_ADD_FAIL:
        return state.set('isEdit', false).set('isSubmittingEdit', false).set('notification', {
          message: 'Add Fail',
          style: 'error'
        });

      case CANCEL_ADD:
      case CANCEL_EDIT:
        return state.set('isEdit', false).set('selected', null);

      case REMOVE:
        return state.set('isRemove', true).set('selected', state.getIn(['entities', action.payload]));

      case CANCEL_REMOVE:
        return state.set('isRemove', false).set('selected', null);

      case SUBMIT_REMOVE_START:
        return state.set('isSubmittingRemove', true);

      case SUBMIT_REMOVE_SUCCESS:
        return state.set('isRemove', false).set('isSubmittingRemove', false).set('query', _extends({}, state.get('query'), { count: state.get('query').count - 1 })).deleteIn(['entities', action.payload[keyField]]).set('notification', {
          message: 'Remove Successfully',
          style: 'info'
        }).set('selected', null);

      case SUBMIT_REMOVE_FAIL:
        return state.set('isRemove', false).set('isSubmittingRemove', false).set('selected', null).set('notification', {
          message: 'Remove Fail',
          style: 'error'
        });

      default:
        return (0, _createQueryReducer2.default)(constants)(state, action);
    }
  };
}