'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadEntities = loadEntities;

var _createQueryConstants2 = require('../create-query-constants.js');

var _createQueryConstants3 = _interopRequireDefault(_createQueryConstants2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadEntities(_ref) {
  var moduleName = _ref.moduleName;
  var state = _ref.state;
  var reducer = _ref.reducer;
  var data = _ref.data;

  var _createQueryConstants = (0, _createQueryConstants3.default)(moduleName);

  var LOAD_ENTITIES_START = _createQueryConstants.LOAD_ENTITIES_START;
  var LOAD_ENTITIES_SUCCESS = _createQueryConstants.LOAD_ENTITIES_SUCCESS;


  var nextState = reducer(state, { type: LOAD_ENTITIES_START });
  nextState = reducer(state, { type: LOAD_ENTITIES_SUCCESS, payload: data });
  return nextState;
}