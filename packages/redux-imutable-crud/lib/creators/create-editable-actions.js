'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createEditableActions;

var _reduxActions = require('redux-actions');

var _createEditableConstants = require('./create-editable-constants');

var _createEditableConstants2 = _interopRequireDefault(_createEditableConstants);

var _createQueryActions = require('./create-query-actions');

var _createQueryActions2 = _interopRequireDefault(_createQueryActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEditableActions(moduleName) {
  var _createEditableConsta = (0, _createEditableConstants2.default)(moduleName);

  var CREATE_START = _createEditableConsta.CREATE_START;
  var EDIT = _createEditableConsta.EDIT;
  var CANCEL_EDIT = _createEditableConsta.CANCEL_EDIT;
  var SUBMIT_EDIT_START = _createEditableConsta.SUBMIT_EDIT_START;
  var ADD = _createEditableConsta.ADD;
  var CANCEL_ADD = _createEditableConsta.CANCEL_ADD;
  var SUBMIT_ADD_START = _createEditableConsta.SUBMIT_ADD_START;
  var REMOVE = _createEditableConsta.REMOVE;
  var CANCEL_REMOVE = _createEditableConsta.CANCEL_REMOVE;
  var SUBMIT_REMOVE_START = _createEditableConsta.SUBMIT_REMOVE_START;


  var queryActions = (0, _createQueryActions2.default)(moduleName);

  return _extends({}, queryActions, {
    create: (0, _reduxActions.createAction)(CREATE_START),
    add: (0, _reduxActions.createAction)(ADD),
    submitAdd: (0, _reduxActions.createAction)(SUBMIT_ADD_START),
    cancelAdd: (0, _reduxActions.createAction)(CANCEL_ADD),

    edit: (0, _reduxActions.createAction)(EDIT),
    submitEdit: (0, _reduxActions.createAction)(SUBMIT_EDIT_START),
    cancelEdit: (0, _reduxActions.createAction)(CANCEL_EDIT),

    remove: (0, _reduxActions.createAction)(REMOVE),
    submitRemove: (0, _reduxActions.createAction)(SUBMIT_REMOVE_START),
    cancelRemove: (0, _reduxActions.createAction)(CANCEL_REMOVE)
  });
}