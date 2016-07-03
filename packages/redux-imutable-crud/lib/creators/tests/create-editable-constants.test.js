'use strict';

var _createEditableConstants = require('../create-editable-constants');

var _createEditableConstants2 = _interopRequireDefault(_createEditableConstants);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Create Editable Constants', function () {
  var constants = (0, _createEditableConstants2.default)('post');
  var CREATE_START = constants.CREATE_START;
  var CREATE_SUCCESS = constants.CREATE_SUCCESS;
  var CREATE_FAIL = constants.CREATE_FAIL;
  var ADD = constants.ADD;
  var CANCEL_ADD = constants.CANCEL_ADD;
  var SUBMIT_ADD_START = constants.SUBMIT_ADD_START;
  var SUBMIT_ADD_SUCCESS = constants.SUBMIT_ADD_SUCCESS;
  var SUBMIT_ADD_FAIL = constants.SUBMIT_ADD_FAIL;
  var EDIT = constants.EDIT;
  var CANCEL_EDIT = constants.CANCEL_EDIT;
  var SUBMIT_EDIT_START = constants.SUBMIT_EDIT_START;
  var SUBMIT_EDIT_SUCCESS = constants.SUBMIT_EDIT_SUCCESS;
  var SUBMIT_EDIT_FAIL = constants.SUBMIT_EDIT_FAIL;
  var REMOVE = constants.REMOVE;
  var CANCEL_REMOVE = constants.CANCEL_REMOVE;
  var SUBMIT_REMOVE_START = constants.SUBMIT_REMOVE_START;
  var SUBMIT_REMOVE_SUCCESS = constants.SUBMIT_REMOVE_SUCCESS;
  var SUBMIT_REMOVE_FAIL = constants.SUBMIT_REMOVE_FAIL;


  it('Create', function () {
    (0, _chai.expect)(CREATE_START).to.equal('post/CREATE_START');
    (0, _chai.expect)(CREATE_SUCCESS).to.equal('post/CREATE_SUCCESS');
    (0, _chai.expect)(CREATE_FAIL).to.equal('post/CREATE_FAIL');
  });

  it('Add', function () {
    (0, _chai.expect)(ADD).to.equal('post/ADD');
    (0, _chai.expect)(CANCEL_ADD).to.equal('post/CANCEL_ADD');
    (0, _chai.expect)(SUBMIT_ADD_START).to.equal('post/SUBMIT_ADD_START');
    (0, _chai.expect)(SUBMIT_ADD_SUCCESS).to.equal('post/SUBMIT_ADD_SUCCESS');
    (0, _chai.expect)(SUBMIT_ADD_FAIL).to.equal('post/SUBMIT_ADD_FAIL');
  });

  it('Edit', function () {
    (0, _chai.expect)(EDIT).to.equal('post/EDIT');
    (0, _chai.expect)(CANCEL_EDIT).to.equal('post/CANCEL_EDIT');
    (0, _chai.expect)(SUBMIT_EDIT_START).to.equal('post/SUBMIT_EDIT_START');
    (0, _chai.expect)(SUBMIT_EDIT_SUCCESS).to.equal('post/SUBMIT_EDIT_SUCCESS');
    (0, _chai.expect)(SUBMIT_EDIT_FAIL).to.equal('post/SUBMIT_EDIT_FAIL');
  });

  it('Edit', function () {
    (0, _chai.expect)(REMOVE).to.equal('post/REMOVE');
    (0, _chai.expect)(CANCEL_REMOVE).to.equal('post/CANCEL_REMOVE');
    (0, _chai.expect)(SUBMIT_REMOVE_START).to.equal('post/SUBMIT_REMOVE_START');
    (0, _chai.expect)(SUBMIT_REMOVE_SUCCESS).to.equal('post/SUBMIT_REMOVE_SUCCESS');
    (0, _chai.expect)(SUBMIT_REMOVE_FAIL).to.equal('post/SUBMIT_REMOVE_FAIL');
  });
});