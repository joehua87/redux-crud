'use strict';

var _createQueryConstants = require('../create-query-constants');

var _createQueryConstants2 = _interopRequireDefault(_createQueryConstants);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Create Query Constants', function () {
  var constants = (0, _createQueryConstants2.default)('post');
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


  it('Load', function () {
    (0, _chai.expect)(LOAD_ENTITIES_START).to.equal('post/LOAD_ENTITIES_START');
    (0, _chai.expect)(LOAD_ENTITIES_SUCCESS).to.equal('post/LOAD_ENTITIES_SUCCESS');
    (0, _chai.expect)(LOAD_ENTITIES_FAIL).to.equal('post/LOAD_ENTITIES_FAIL');
  });

  it('Load more', function () {
    (0, _chai.expect)(LOAD_MORE_START).to.equal('post/LOAD_MORE_START');
    (0, _chai.expect)(LOAD_MORE_SUCCESS).to.equal('post/LOAD_MORE_SUCCESS');
    (0, _chai.expect)(LOAD_MORE_FAIL).to.equal('post/LOAD_MORE_FAIL');
  });

  it('Load detail', function () {
    (0, _chai.expect)(LOAD_DETAIL_START).to.equal('post/LOAD_DETAIL_START');
    (0, _chai.expect)(LOAD_DETAIL_SUCCESS).to.equal('post/LOAD_DETAIL_SUCCESS');
    (0, _chai.expect)(LOAD_DETAIL_FAIL).to.equal('post/LOAD_DETAIL_FAIL');
    (0, _chai.expect)(CLOSE_DETAIL).to.equal('post/CLOSE_DETAIL');
  });

  it('Show filter', function () {
    (0, _chai.expect)(SHOW_FILTER_GUIDE_START).to.equal('post/SHOW_FILTER_GUIDE_START');
    (0, _chai.expect)(SHOW_FILTER_GUIDE_SUCCESS).to.equal('post/SHOW_FILTER_GUIDE_SUCCESS');
    (0, _chai.expect)(SHOW_FILTER_GUIDE_FAIL).to.equal('post/SHOW_FILTER_GUIDE_FAIL');
    (0, _chai.expect)(CLOSE_FILTER_GUIDE).to.equal('post/CLOSE_FILTER_GUIDE');
  });

  it('Misc', function () {
    (0, _chai.expect)(DISMISS_NOTIFICATION).to.equal('post/DISMISS_NOTIFICATION');
  });
});