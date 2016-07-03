'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = createRequestSaga;

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param types
 * @param method
 * @param url
 * @param headers
 * @param params
 * @param data
 * @param selectState
 * @returns {Function}
 */
function createRequestSaga(_ref) {
  var types = _ref.types;
  var method = _ref.method;
  var url = _ref.url;
  var headers = _ref.headers;
  var params = _ref.params;
  var data = _ref.data;
  var selectState = _ref.selectState;

  return regeneratorRuntime.mark(function _callee() {
    var _types, START, SUCCESS, FAIL, success, fail, state, watcher, finalUrl, finalParams, finalData, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // eslint-disable-line func-names
            _types = _slicedToArray(types, 3);
            START = _types[0];
            SUCCESS = _types[1];
            FAIL = _types[2];
            success = (0, _reduxActions.createAction)(SUCCESS);
            fail = (0, _reduxActions.createAction)(FAIL);
            state = null;

            if (!selectState) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return (0, _effects.select)(function (x) {
              return x.toJS();
            });

          case 10:
            state = _context.sent;

          case 11:
            if (!true) {
              _context.next = 44;
              break;
            }

            _context.next = 14;
            return (0, _effects.race)({
              loadEntities: (0, _effects.take)(START),
              stop: (0, _effects.take)(_reactRouterRedux.LOCATION_CHANGE) });

          case 14:
            watcher = _context.sent;

            if (!watcher.stop) {
              _context.next = 17;
              break;
            }

            return _context.abrupt('break', 44);

          case 17:
            finalUrl = void 0;

            if (!(typeof url === 'string')) {
              _context.next = 22;
              break;
            }

            finalUrl = url;
            _context.next = 27;
            break;

          case 22:
            if (!(typeof url === 'function')) {
              _context.next = 26;
              break;
            }

            finalUrl = url({ payload: watcher.loadEntities.payload, state: state });
            _context.next = 27;
            break;

          case 26:
            throw new Error('url must be a string or function');

          case 27:
            finalParams = void 0;

            if (typeof params === 'function') {
              finalParams = params({ payload: watcher.loadEntities.payload, state: state });
            }

            finalData = void 0;

            if (typeof data === 'function') {
              finalData = data({ payload: watcher.loadEntities.payload, state: state });
            }

            // Should race here, between waiting for request & location changed
            _context.next = 33;
            return (0, _effects.call)(_request2.default, finalUrl, {
              method: method,
              headers: headers,
              params: finalParams,
              data: finalData
            });

          case 33:
            response = _context.sent;

            if (!(response.err === undefined || response.err === null)) {
              _context.next = 39;
              break;
            }

            _context.next = 37;
            return (0, _effects.put)(success(response.data));

          case 37:
            _context.next = 42;
            break;

          case 39:
            console.log(response.err.response); // eslint-disable-line no-console
            _context.next = 42;
            return (0, _effects.put)(fail(response.err));

          case 42:
            _context.next = 11;
            break;

          case 44:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
}