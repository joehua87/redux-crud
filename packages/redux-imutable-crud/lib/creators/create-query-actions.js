'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultInitialState = undefined;
exports.default = createActions;

var _reduxActions = require('redux-actions');

var _createQueryConstants2 = require('./create-query-constants');

var _createQueryConstants3 = _interopRequireDefault(_createQueryConstants2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultInitialState = exports.defaultInitialState = {
  isLoading: false,
  isLoadingFilterGuide: false,
  isLoadingDetail: false,
  isLoadingMore: false,
  entities: [],
  count: 0,
  page: 1,
  selected: null,
  isShowDetail: false,
  filterFields: [],
  isShowFilterGuide: false,
  error: null
};

function createActions(moduleName) {
  var _createQueryConstants = (0, _createQueryConstants3.default)(moduleName);

  var LOAD_ENTITIES_START = _createQueryConstants.LOAD_ENTITIES_START;
  var LOAD_MORE_START = _createQueryConstants.LOAD_MORE_START;
  var LOAD_DETAIL_START = _createQueryConstants.LOAD_DETAIL_START;
  var CLOSE_DETAIL = _createQueryConstants.CLOSE_DETAIL;
  var SHOW_FILTER_GUIDE_START = _createQueryConstants.SHOW_FILTER_GUIDE_START;
  var DISMISS_NOTIFICATION = _createQueryConstants.DISMISS_NOTIFICATION;
  var CLOSE_FILTER_GUIDE = _createQueryConstants.CLOSE_FILTER_GUIDE;


  return {
    loadEntities: (0, _reduxActions.createAction)(LOAD_ENTITIES_START),
    loadMore: (0, _reduxActions.createAction)(LOAD_MORE_START),
    loadDetail: (0, _reduxActions.createAction)(LOAD_DETAIL_START),
    closeDetail: (0, _reduxActions.createAction)(CLOSE_DETAIL),
    showFilterGuide: (0, _reduxActions.createAction)(SHOW_FILTER_GUIDE_START),
    closeFilterGuide: (0, _reduxActions.createAction)(CLOSE_FILTER_GUIDE),
    dismissNotification: (0, _reduxActions.createAction)(DISMISS_NOTIFICATION)
  };
}