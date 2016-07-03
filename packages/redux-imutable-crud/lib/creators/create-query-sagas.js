'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createQuerySaga;

var _createRequestSaga = require('./create-request-saga');

var _createRequestSaga2 = _interopRequireDefault(_createRequestSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createQuerySaga(_ref) {
  var constants = _ref.constants;
  var endpoint = _ref.endpoint;
  var selectState = _ref.selectState;
  var listProjection = _ref.listProjection;
  var detailProjection = _ref.detailProjection;
  var LOAD_ENTITIES_START = constants.LOAD_ENTITIES_START;
  var LOAD_ENTITIES_SUCCESS = constants.LOAD_ENTITIES_SUCCESS;
  var LOAD_ENTITIES_FAIL = constants.LOAD_ENTITIES_FAIL;
  var LOAD_DETAIL_START = constants.LOAD_DETAIL_START;
  var LOAD_DETAIL_SUCCESS = constants.LOAD_DETAIL_SUCCESS;
  var LOAD_DETAIL_FAIL = constants.LOAD_DETAIL_FAIL;
  var LOAD_MORE_START = constants.LOAD_MORE_START;
  var LOAD_MORE_SUCCESS = constants.LOAD_MORE_SUCCESS;
  var LOAD_MORE_FAIL = constants.LOAD_MORE_FAIL;
  var SHOW_FILTER_GUIDE_START = constants.SHOW_FILTER_GUIDE_START;
  var SHOW_FILTER_GUIDE_SUCCESS = constants.SHOW_FILTER_GUIDE_SUCCESS;
  var SHOW_FILTER_GUIDE_FAIL = constants.SHOW_FILTER_GUIDE_FAIL;


  var loadEntitiesSaga = (0, _createRequestSaga2.default)({
    types: [LOAD_ENTITIES_START, LOAD_ENTITIES_SUCCESS, LOAD_ENTITIES_FAIL],
    method: 'get',
    url: endpoint + '/query',
    params: function params(_ref2) {
      var payload = _ref2.payload;
      return {
        filter: _extends({}, payload),
        projection: listProjection
      };
    }
  });

  var loadMoreSaga = (0, _createRequestSaga2.default)({
    types: [LOAD_MORE_START, LOAD_MORE_SUCCESS, LOAD_MORE_FAIL],
    method: 'get',
    url: endpoint + '/query',
    selectState: selectState, // Need use state to get current page, limit
    params: function params(_ref3) {
      var _ref3$payload = _ref3.payload;
      var filter = _ref3$payload.filter;
      var page = _ref3$payload.page;
      var limit = _ref3$payload.limit;
      var sort = _ref3$payload.sort;
      var projection = _ref3$payload.projection;
      return {
        filter: filter,
        page: page,
        limit: limit,
        sort: sort,
        projection: projection
      };
    }
  });

  var loadDetailSaga = (0, _createRequestSaga2.default)({
    types: [LOAD_DETAIL_START, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    method: 'get',
    url: function url(_ref4) {
      var payload = _ref4.payload;
      return endpoint + '/id/' + payload;
    },
    params: {
      projection: detailProjection
    }
  });

  var showFilterGuideSaga = (0, _createRequestSaga2.default)({
    types: [SHOW_FILTER_GUIDE_START, SHOW_FILTER_GUIDE_SUCCESS, SHOW_FILTER_GUIDE_FAIL],
    method: 'get',
    url: endpoint + '/get-config'
  });

  // Return object for easier testing each function
  return {
    loadEntitiesSaga: loadEntitiesSaga,
    loadMoreSaga: loadMoreSaga,
    loadDetailSaga: loadDetailSaga,
    showFilterGuideSaga: showFilterGuideSaga,
    list: [loadEntitiesSaga, loadMoreSaga, loadDetailSaga, showFilterGuideSaga]
  };
}