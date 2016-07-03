'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _createQueryConstants = require('../create-query-constants');

var _createQueryConstants2 = _interopRequireDefault(_createQueryConstants);

var _createQueryReducer = require('../create-query-reducer.js');

var _createQueryReducer2 = _interopRequireDefault(_createQueryReducer);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _categories = require('./test-data/categories.json');

var _categories2 = _interopRequireDefault(_categories);

var _categoriesMore = require('./test-data/categories-more.json');

var _categoriesMore2 = _interopRequireDefault(_categoriesMore);

var _filterGuide = require('./test-data/filter-guide.json');

var _filterGuide2 = _interopRequireDefault(_filterGuide);

var _categoryDetail = require('./test-data/categoryDetail.json');

var _categoryDetail2 = _interopRequireDefault(_categoryDetail);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(require('chai-things'));
var expect = _chai2.default.expect;


var moduleName = 'post-category';
var constants = (0, _createQueryConstants2.default)(moduleName);
var reducer = (0, _createQueryReducer2.default)(constants);
var error = { message: 'Some error' };

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


describe('Query Reducer', function () {
  describe('Show / hide filter guide success', function () {
    var state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());

    it('start', function () {
      state = reducer(state, { type: SHOW_FILTER_GUIDE_START });
      expect(state.toJS()).to.have.property('isLoadingFilterGuide', true);
    });

    it('success', function () {
      state = reducer(state, { type: SHOW_FILTER_GUIDE_SUCCESS, payload: _filterGuide2.default });

      expect(state.toJS()).to.have.property('isLoadingFilterGuide', false);
      expect(state.toJS()).to.have.property('error', null);

      expect(state.toJS()).to.have.property('isShowFilterGuide', true);

      expect(state.toJS()).to.have.property('filterFields');
      expect(state.toJS().filterFields).to.all.have.property('filterField');
      expect(state.toJS().filterFields).to.all.have.property('compareType');
      expect(state.toJS().filterFields).to.all.have.property('dbType');
    });

    it('hide filter guide', function () {
      state = reducer(state, { type: CLOSE_FILTER_GUIDE });
      expect(state.toJS()).to.have.property('isShowFilterGuide', false);
    });
  });

  describe('Show filter guide fail', function () {
    var state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());

    it('start', function () {
      state = reducer(state, { type: SHOW_FILTER_GUIDE_START });
      expect(state.toJS()).to.have.property('isLoadingFilterGuide', true);
    });

    it('fail', function () {
      state = reducer(state, { type: SHOW_FILTER_GUIDE_FAIL, payload: error });

      expect(state.toJS()).to.have.property('isLoadingFilterGuide', false);
      expect(state.toJS()).to.have.property('isShowFilterGuide', false);
      expect(state.toJS()).to.have.property('filterFields').to.deep.equal([]);
      expect(state.toJS().error).to.deep.equal(error);
    });
  });

  describe('Load entities success', function () {
    var state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
    it('start', function () {
      state = reducer(state, { type: LOAD_ENTITIES_START });
      expect(state.toJS()).to.have.property('isLoading', true);
    });

    it('success', function () {
      state = reducer(state, { type: LOAD_ENTITIES_SUCCESS, payload: _categories2.default });
      expect(state.toJS()).to.have.property('isLoading', false);
      expect(state.toJS()).to.have.property('error', null);

      expect(state.toJS().query).to.have.property('count');
      expect(state.toJS().query).to.have.property('page', 1);
      expect(state.toJS().query).to.have.property('limit', 10);
      expect(Object.keys(state.toJS().entities)).to.have.property('length', 10);
    });
  });

  describe('Load entities fail', function () {
    var state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());

    it('start', function () {
      state = reducer(state, { type: LOAD_ENTITIES_START });
      expect(state.toJS()).to.have.property('isLoading', true);
    });

    it('fail', function () {
      state = reducer(state, { type: LOAD_ENTITIES_FAIL, payload: error });
      expect(state.toJS()).to.have.property('isLoading', false);
      expect(state.toJS().error).to.have.deep.equal(error);
    });
  });

  describe('Load more fail', function () {
    var state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
    state = (0, _helpers.loadEntities)({ moduleName: moduleName, state: state, reducer: reducer, data: _categories2.default });

    it('start', function () {
      state = reducer(state, { type: LOAD_MORE_START });
      expect(state.toJS()).to.have.property('isLoadingMore', true);
    });

    it('fail', function () {
      state = reducer(state, { type: LOAD_MORE_FAIL, payload: error });
      expect(state.toJS()).to.have.property('isLoadingMore', false);
      expect(state.toJS().error).to.equal(error);
    });
  });

  describe('Load more success', function () {
    var state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
    state = (0, _helpers.loadEntities)({ moduleName: moduleName, state: state, reducer: reducer, data: _categories2.default });

    it('start', function () {
      state = reducer(state, { type: LOAD_MORE_START });
      expect(state.toJS()).to.have.property('isLoadingMore', true);
    });

    it('success', function () {
      state = reducer(state, { type: LOAD_MORE_SUCCESS, payload: _categoriesMore2.default });

      expect(state.toJS()).to.have.property('isLoadingMore', false);
      expect(state.toJS()).to.have.property('error', null);

      expect(state.toJS()).to.have.property('query');
      expect(state.toJS().query).to.have.property('count');
      expect(state.toJS().query).to.have.property('page', 2);
      expect(state.toJS().query).to.have.property('limit', 10);
      expect(Object.keys(state.toJS().entities)).to.have.property('length', 14);
    });
  });

  describe('Load detail success', function () {
    var state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
    state = (0, _helpers.loadEntities)({ moduleName: moduleName, state: state, reducer: reducer, data: _categories2.default });

    it('start', function () {
      // Load & show
      state = reducer(state, { type: LOAD_DETAIL_START, payload: { show: true } });
      expect(state.toJS()).to.have.property('isLoadingDetail', true);
      expect(state.toJS()).to.have.property('isShowDetail', true);
    });

    it('success', function () {
      // Load & show
      state = reducer(state, { type: LOAD_DETAIL_SUCCESS, payload: _categoryDetail2.default });
      expect(state.toJS()).to.have.property('isLoadingDetail', false);
      expect(state.toJS()).to.have.property('isShowDetail', true);
      expect(state.toJS()).to.have.property('selected', _categoryDetail2.default);
    });

    it('close detail', function () {
      // Load & show
      state = reducer(state, { type: CLOSE_DETAIL });
      expect(state.toJS()).to.have.property('isShowDetail', false);
      expect(state.toJS()).to.have.property('selected', null);
    });
  });

  describe('Load detail fail', function () {
    var state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
    state = (0, _helpers.loadEntities)({ moduleName: moduleName, state: state, reducer: reducer, data: _categories2.default });

    it('start', function () {
      // Load & show
      state = reducer(state, { type: LOAD_DETAIL_START, payload: { show: true } });
      expect(state.toJS()).to.have.property('isLoadingDetail', true);
      expect(state.toJS()).to.have.property('isShowDetail', true);
    });

    it('fail', function () {
      // Load & show
      state = reducer(state, { type: LOAD_DETAIL_FAIL, payload: error });
      expect(state.toJS()).to.have.property('isLoadingDetail', false);
      expect(state.toJS()).to.have.property('isShowDetail', false);
      expect(state.toJS()).to.have.property('selected', null);
      expect(state.toJS()).to.have.property('error', error);
    });
  });

  describe('Dismiss notification', function () {
    // Assume it has notificationMessage
    var state = (0, _immutable.fromJS)(_extends({}, _createQueryReducer.initialState.toJS(), {
      notification: {
        message: 'Add Successfully',
        style: 'info'
      }
    }));

    it('success', function () {
      state = reducer(state, { type: DISMISS_NOTIFICATION });
      expect(state.toJS()).to.have.property('notification', null);
    });
  });
});