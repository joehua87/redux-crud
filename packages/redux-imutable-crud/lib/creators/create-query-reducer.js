'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createReducer;

var _immutable = require('immutable');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var initialState = exports.initialState = (0, _immutable.fromJS)({
  isLoading: false,
  isLoadingFilterGuide: false,
  isLoadingDetail: false,
  isLoadingMore: false,
  isEdit: false,
  isRemove: false,
  entities: (0, _immutable.fromJS)({}),
  query: {
    count: 0,
    page: 1
  },
  hasMore: false,
  selected: null,
  isShowDetail: false,
  filterFields: [],
  isShowFilterGuide: false,
  error: null
});

function createReducer(constants) {
  var keyField = constants.keyField;
  var LOAD_ENTITIES_START = constants.LOAD_ENTITIES_START;
  var LOAD_ENTITIES_SUCCESS = constants.LOAD_ENTITIES_SUCCESS;
  var LOAD_ENTITIES_FAIL = constants.LOAD_ENTITIES_FAIL;
  var LOAD_MORE_START = constants.LOAD_MORE_START;
  var LOAD_MORE_SUCCESS = constants.LOAD_MORE_SUCCESS;
  var LOAD_MORE_FAIL = constants.LOAD_MORE_FAIL;
  var LOAD_DETAIL_START = constants.LOAD_DETAIL_START;
  var LOAD_DETAIL_SUCCESS = constants.LOAD_DETAIL_SUCCESS;
  var LOAD_DETAIL_FAIL = constants.LOAD_DETAIL_FAIL;
  var CLOSE_DETAIL = constants.CLOSE_DETAIL;
  var SHOW_FILTER_GUIDE_START = constants.SHOW_FILTER_GUIDE_START;
  var SHOW_FILTER_GUIDE_SUCCESS = constants.SHOW_FILTER_GUIDE_SUCCESS;
  var SHOW_FILTER_GUIDE_FAIL = constants.SHOW_FILTER_GUIDE_FAIL;
  var CLOSE_FILTER_GUIDE = constants.CLOSE_FILTER_GUIDE;
  var DISMISS_NOTIFICATION = constants.DISMISS_NOTIFICATION;


  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref = action.payload || {};

    var entities = _ref.entities;

    var query = _objectWithoutProperties(_ref, ['entities']);

    var entitiesMap = entities && entities.reduce(function (acc, value) {
      return _extends({}, acc, _defineProperty({}, value[keyField], value));
    }, {});

    switch (action.type) {
      case LOAD_ENTITIES_START:
        return state.set('isLoading', true);

      case LOAD_ENTITIES_SUCCESS:
        return state.set('isLoading', false).set('entities', (0, _immutable.fromJS)(entitiesMap)).set('query', query).set('hasMore', query.count > (query.page + 1) * query.limit).set('error', null);

      case LOAD_ENTITIES_FAIL:
        return state.set('isLoading', false).set('error', action.payload);

      case LOAD_MORE_START:
        return state.set('isLoadingMore', true).set('error', action.payload);

      case LOAD_MORE_SUCCESS:
        return state.set('isLoadingMore', false).mergeIn(['entities'], entitiesMap).set('query', query).set('hasMore', query.count > (query.page + 1) * query.limit).set('error', null);

      case LOAD_MORE_FAIL:
        return state.set('isLoadingMore', false).set('error', action.payload).set('selected', null).set('isEdit', false);

      case LOAD_DETAIL_START:
        return state.set('isLoadingDetail', true).set('isShowDetail', true);

      case LOAD_DETAIL_SUCCESS:
        return state.set('isLoadingDetail', false).set('selected', action.payload).set('error', null);

      case LOAD_DETAIL_FAIL:
        return state.set('isLoadingDetail', false).set('selected', null).set('isShowDetail', false).set('selected', null).set('error', action.payload);

      case CLOSE_DETAIL:
        return state.set('selected', null).set('isShowDetail', false);

      case SHOW_FILTER_GUIDE_START:
        return state.set('isLoadingFilterGuide', true);

      case SHOW_FILTER_GUIDE_SUCCESS:
        return state.set('filterFields', action.payload.fields).set('isShowFilterGuide', true).set('isLoadingFilterGuide', false);

      case SHOW_FILTER_GUIDE_FAIL:
        return state.set('error', action.payload).set('filterFields', []).set('isShowFilterGuide', false).set('isLoadingFilterGuide', false);

      case CLOSE_FILTER_GUIDE:
        return state.set('isShowFilterGuide', false);

      case DISMISS_NOTIFICATION:
        return state.set('notification', null);
      default:
        return state;
    }
  };
}