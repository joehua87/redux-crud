'use strict';

var _immutable = require('immutable');

var _createEditableConstants = require('../create-editable-constants');

var _createEditableConstants2 = _interopRequireDefault(_createEditableConstants);

var _createEditableReducer = require('../create-editable-reducer.js');

var _createEditableReducer2 = _interopRequireDefault(_createEditableReducer);

var _createQueryReducer = require('../create-query-reducer.js');

var _chai = require('chai');

var _categories = require('./test-data/categories.json');

var _categories2 = _interopRequireDefault(_categories);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleName = 'post-category';
var constants = (0, _createEditableConstants2.default)(moduleName);
var reducer = (0, _createEditableReducer2.default)(constants);
var error = { message: 'Some error' };
var _id = _categories2.default.entities[0]._id;
var edited = _categories2.default.entities[0];
var removed = _categories2.default.entities[0];

var CREATE_START = constants.CREATE_START;
var CREATE_SUCCESS = constants.CREATE_SUCCESS;
var CREATE_FAIL = constants.CREATE_FAIL;
var LOAD_DETAIL_SUCCESS = constants.LOAD_DETAIL_SUCCESS;
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


describe('Editable Reducer', function () {
  describe('Add', function () {
    var state = void 0;

    beforeEach(function () {
      state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
      state = (0, _helpers.loadEntities)({ moduleName: moduleName, state: state, reducer: reducer, data: _categories2.default });
    });

    function clickAdd() {
      it('click add', function () {
        state = reducer(state, { type: ADD });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', true);
        (0, _chai.expect)(state.toJS().selected).to.deep.equal({});
      });
    }

    function startSubmitAdd() {
      it('start submit', function () {
        state = reducer(state, { type: SUBMIT_ADD_START });
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', true);
      });
    }

    describe('Add success', function () {
      clickAdd();
      startSubmitAdd();

      it('submit success', function () {
        state = reducer(state, { type: SUBMIT_ADD_SUCCESS, payload: { slug: 'category-01', name: 'Category 01' } });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', false);

        (0, _chai.expect)(Object.keys(state.toJS().entities)).to.have.property('length', 11);
        (0, _chai.expect)(state.toJS().query).to.have.property('count', 15); // increase count

        (0, _chai.expect)(state.toJS()).to.have.property('notification');
        (0, _chai.expect)(state.toJS().notification).to.have.property('message', 'Add Successfully');
        (0, _chai.expect)(state.toJS().notification).to.have.property('style', 'info');
      });
    });

    describe('Cancel add', function () {
      clickAdd();

      it('cancel add', function () {
        state = reducer(state, { type: CANCEL_ADD });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('selected', null);
      });
    });

    describe('Add fail', function () {
      clickAdd();
      startSubmitAdd();

      it('submit fail', function () {
        state = reducer(state, { type: SUBMIT_ADD_FAIL, payload: error });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', false);

        (0, _chai.expect)(state.toJS()).to.have.property('notification');
        (0, _chai.expect)(state.toJS().notification).to.have.property('message', 'Add Fail');
        (0, _chai.expect)(state.toJS().notification).to.have.property('style', 'error');
      });
    });
  });

  describe('Create', function () {
    var state = void 0;

    beforeEach(function () {
      state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
      state = (0, _helpers.loadEntities)({ moduleName: moduleName, state: state, reducer: reducer, data: _categories2.default });
    });

    function startSubmitCreate() {
      it('start', function () {
        state = reducer(state, { type: CREATE_START });
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', true);
      });
    }

    describe('Create success', function () {
      startSubmitCreate();

      it('success', function () {
        state = reducer(state, { type: CREATE_SUCCESS, payload: { slug: 'category-01', name: 'Category 01' } });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', false);

        (0, _chai.expect)(state.toJS()).to.have.property('notification');
        (0, _chai.expect)(state.toJS().notification).to.have.property('message', 'Create Successfully');
        (0, _chai.expect)(state.toJS().notification).to.have.property('style', 'info');

        (0, _chai.expect)(Object.keys(state.toJS().entities)).to.have.property('length', 11);
        (0, _chai.expect)(state.toJS().query).to.have.property('count', 15); // increase count
      });
    });

    describe('Create fail', function () {
      startSubmitCreate();

      it('fail', function () {
        state = reducer(state, { type: CREATE_FAIL, payload: error });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', false);

        (0, _chai.expect)(state.toJS()).to.have.property('notification');
        (0, _chai.expect)(state.toJS().notification).to.have.property('message', 'Create Fail');
        (0, _chai.expect)(state.toJS().notification).to.have.property('style', 'error');
      });
    });
  });

  describe('Edit', function () {
    var state = void 0;
    beforeEach(function () {
      state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
      state = (0, _helpers.loadEntities)({ moduleName: moduleName, state: state, reducer: reducer, data: _categories2.default });
    });

    function clickEdit() {
      it('click edit', function () {
        state = reducer(state, { type: EDIT });
        state = reducer(state, { type: LOAD_DETAIL_SUCCESS, payload: edited });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', true);
        (0, _chai.expect)(state.toJS().selected).to.deep.equal(edited);
      });
    }

    function startSubmitEdit() {
      it('start submit', function () {
        state = reducer(state, { type: SUBMIT_EDIT_START });
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', true);
      });
    }

    describe('Edit success', function () {
      clickEdit();
      startSubmitEdit();

      it('submit success', function () {
        state = reducer(state, { type: SUBMIT_EDIT_SUCCESS, payload: { slug: 'category-01', name: 'Category 01' } });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', false);

        (0, _chai.expect)(state.toJS()).to.have.property('notification');
        (0, _chai.expect)(state.toJS().notification).to.have.property('message', 'Save Successfully');
        (0, _chai.expect)(state.toJS().notification).to.have.property('style', 'info');
      });
    });

    describe('Cancel edit', function () {
      clickEdit();

      it('cancel', function () {
        state = reducer(state, { type: CANCEL_EDIT });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('selected', null);
      });
    });

    describe('Edit fail', function () {
      clickEdit();
      startSubmitEdit();

      it('submit fail', function () {
        state = reducer(state, { type: SUBMIT_EDIT_FAIL, payload: error });
        (0, _chai.expect)(state.toJS()).to.have.property('isEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingEdit', false);
        (0, _chai.expect)(state.toJS()).to.have.property('selected', null);

        (0, _chai.expect)(state.toJS()).to.have.property('notification');
        (0, _chai.expect)(state.toJS().notification).to.have.property('message', 'Save Fail');
        (0, _chai.expect)(state.toJS().notification).to.have.property('style', 'error');
      });
    });
  });

  describe('Remove', function () {
    var state = void 0;
    beforeEach(function () {
      state = (0, _immutable.fromJS)(_createQueryReducer.initialState.toJS());
      state = (0, _helpers.loadEntities)({ moduleName: moduleName, state: state, reducer: reducer, data: _categories2.default });
    });

    function clickRemove() {
      it('click remove', function () {
        state = reducer(state, { type: REMOVE, payload: _id });
        (0, _chai.expect)(state.toJS()).to.have.property('isRemove', true);
        (0, _chai.expect)(state.toJS().selected).to.deep.equal(edited);
      });
    }

    function startRemove() {
      it('start submit', function () {
        state = reducer(state, { type: SUBMIT_REMOVE_START });
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingRemove', true);
      });
    }

    describe('Cancel Remove', function () {
      clickRemove();

      it('cancel remove', function () {
        state = reducer(state, { type: CANCEL_REMOVE });
        (0, _chai.expect)(state.toJS()).to.have.property('isRemove', false);
        (0, _chai.expect)(state.toJS()).to.have.property('selected', null);
      });
    });

    describe('Remove success', function () {
      clickRemove();
      startRemove();

      it('submit success', function () {
        state = reducer(state, { type: SUBMIT_REMOVE_SUCCESS, payload: removed });
        (0, _chai.expect)(state.toJS()).to.have.property('isRemove', false);
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingRemove', false);
        (0, _chai.expect)(state.toJS()).to.have.property('selected', null);

        (0, _chai.expect)(state.toJS()).to.have.property('notification');
        (0, _chai.expect)(state.toJS().notification).to.have.property('message', 'Remove Successfully');
        (0, _chai.expect)(state.toJS().notification).to.have.property('style', 'info');

        (0, _chai.expect)(Object.keys(state.toJS().entities)).to.have.property('length', 9);
        (0, _chai.expect)(state.toJS().query).to.have.property('count', 13); // decrease count
      });
    });

    describe('Remove fail', function () {
      clickRemove();
      startRemove();

      it('submit fail', function () {
        state = reducer(state, { type: SUBMIT_REMOVE_FAIL, payload: error });
        (0, _chai.expect)(state.toJS()).to.have.property('isRemove', false);
        (0, _chai.expect)(state.toJS()).to.have.property('isSubmittingRemove', false);
        (0, _chai.expect)(state.toJS()).to.have.property('selected', null);

        (0, _chai.expect)(state.toJS()).to.have.property('notification');
        (0, _chai.expect)(state.toJS().notification).to.have.property('message', 'Remove Fail');
        (0, _chai.expect)(state.toJS().notification).to.have.property('style', 'error');
      });
    });
  });
});