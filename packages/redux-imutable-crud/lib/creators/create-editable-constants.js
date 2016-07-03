'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createEditableConstants;

var _createQueryConstants = require('./create-query-constants');

var _createQueryConstants2 = _interopRequireDefault(_createQueryConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createEditableConstants(name) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return _extends({}, (0, _createQueryConstants2.default)(name, options), {
    CREATE_START: name + '/CREATE_START',
    CREATE_SUCCESS: name + '/CREATE_SUCCESS',
    CREATE_FAIL: name + '/CREATE_FAIL',

    ADD: name + '/ADD',
    CANCEL_ADD: name + '/CANCEL_ADD',

    SUBMIT_ADD_START: name + '/SUBMIT_ADD_START',
    SUBMIT_ADD_SUCCESS: name + '/SUBMIT_ADD_SUCCESS',
    SUBMIT_ADD_FAIL: name + '/SUBMIT_ADD_FAIL',

    EDIT: name + '/EDIT',
    CANCEL_EDIT: name + '/CANCEL_EDIT',

    SUBMIT_EDIT_START: name + '/SUBMIT_EDIT_START',
    SUBMIT_EDIT_SUCCESS: name + '/SUBMIT_EDIT_SUCCESS',
    SUBMIT_EDIT_FAIL: name + '/SUBMIT_EDIT_FAIL',

    REMOVE: name + '/REMOVE',
    CANCEL_REMOVE: name + '/CANCEL_REMOVE',

    SUBMIT_REMOVE_START: name + '/SUBMIT_REMOVE_START',
    SUBMIT_REMOVE_SUCCESS: name + '/SUBMIT_REMOVE_SUCCESS',
    SUBMIT_REMOVE_FAIL: name + '/SUBMIT_REMOVE_FAIL'
  });
}