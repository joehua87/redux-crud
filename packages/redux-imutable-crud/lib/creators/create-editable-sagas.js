'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEditableSaga;

var _effects = require('redux-saga/effects');

var _createRequestSaga = require('./create-request-saga');

var _createRequestSaga2 = _interopRequireDefault(_createRequestSaga);

var _createQuerySagas = require('./create-query-sagas');

var _createQuerySagas2 = _interopRequireDefault(_createQuerySagas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createEditableSaga(_ref) {
  var _marked = [editSaga].map(regeneratorRuntime.mark);

  var actions = _ref.actions;
  var constants = _ref.constants;
  var endpoint = _ref.endpoint;
  var selectState = _ref.selectState;
  var listProjection = _ref.listProjection;
  var detailProjection = _ref.detailProjection;
  var CREATE_START = constants.CREATE_START;
  var CREATE_SUCCESS = constants.CREATE_SUCCESS;
  var CREATE_FAIL = constants.CREATE_FAIL;
  var SUBMIT_ADD_START = constants.SUBMIT_ADD_START;
  var SUBMIT_ADD_SUCCESS = constants.SUBMIT_ADD_SUCCESS;
  var SUBMIT_ADD_FAIL = constants.SUBMIT_ADD_FAIL;
  var SUBMIT_EDIT_START = constants.SUBMIT_EDIT_START;
  var SUBMIT_EDIT_SUCCESS = constants.SUBMIT_EDIT_SUCCESS;
  var SUBMIT_EDIT_FAIL = constants.SUBMIT_EDIT_FAIL;
  var EDIT = constants.EDIT;
  var SUBMIT_REMOVE_START = constants.SUBMIT_REMOVE_START;
  var SUBMIT_REMOVE_SUCCESS = constants.SUBMIT_REMOVE_SUCCESS;
  var SUBMIT_REMOVE_FAIL = constants.SUBMIT_REMOVE_FAIL;
  var loadDetail = actions.loadDetail;


  var querySagas = (0, _createQuerySagas2.default)({
    actions: actions,
    constants: constants,
    endpoint: endpoint,
    selectState: selectState,
    listProjection: listProjection,
    detailProjection: detailProjection
  });

  var submitEditSaga = (0, _createRequestSaga2.default)({
    types: [SUBMIT_EDIT_START, SUBMIT_EDIT_SUCCESS, SUBMIT_EDIT_FAIL],
    method: 'put',
    url: endpoint + '/validate-update',
    data: function data(_ref2) {
      var payload = _ref2.payload;
      return payload;
    }
  });

  var submitAddSaga = (0, _createRequestSaga2.default)({
    types: [SUBMIT_ADD_START, SUBMIT_ADD_SUCCESS, SUBMIT_ADD_FAIL],
    method: 'post',
    url: endpoint,
    data: function data(_ref3) {
      var payload = _ref3.payload;
      return payload;
    }
  });

  var createSaga = (0, _createRequestSaga2.default)({
    types: [CREATE_START, CREATE_SUCCESS, CREATE_FAIL],
    method: 'post',
    url: endpoint + '/create',
    data: function data(_ref4) {
      var payload = _ref4.payload;
      return payload;
    }
  });

  var submitRemoveSaga = (0, _createRequestSaga2.default)({
    types: [SUBMIT_REMOVE_START, SUBMIT_REMOVE_SUCCESS, SUBMIT_REMOVE_FAIL],
    method: 'delete',
    url: function url(_ref5) {
      var payload = _ref5.payload;
      return endpoint + '/delete/' + payload;
    }
  });

  function editSaga() {
    var editAction;
    return regeneratorRuntime.wrap(function editSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!true) {
              _context.next = 8;
              break;
            }

            _context.next = 3;
            return (0, _effects.take)(EDIT);

          case 3:
            editAction = _context.sent;
            _context.next = 6;
            return (0, _effects.put)(loadDetail(editAction.payload));

          case 6:
            _context.next = 0;
            break;

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  // Return object for easier testing each function
  return {
    submitAddSaga: submitAddSaga,
    submitEditSaga: submitEditSaga,
    submitRemoveSaga: submitRemoveSaga,
    createSaga: createSaga,
    editSaga: editSaga,
    list: [].concat(_toConsumableArray(querySagas.list), [submitAddSaga, submitEditSaga, submitRemoveSaga, createSaga, editSaga])
  };
}