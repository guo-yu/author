'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = undefined;
exports.joinToken = joinToken;
exports.parseToken = parseToken;
exports.nonce = nonce;
exports.timestamp = timestamp;
exports.signature = signature;
exports.oauth1 = oauth1;

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function joinToken(obj) {
  var list = [];

  _underscore2.default.each(obj, function (value, key) {
    return list.push(encodeURIComponent(key + '=' + value));
  });

  return list.sort().join('&');
}

function parseToken(string) {
  var list = string.split('&');
  var map = {};

  list.forEach(function (item) {
    return map[item.substr(0, item.indexOf('='))] = item.substr(item.indexOf('=') + 1);
  });

  return map;
}

var token = exports.token = {
  join: joinToken,
  parse: parseToken
};

function nonce(length) {
  var last = null;
  var repeat = 0;
  var now = Math.pow(10, 2) * +new Date();
  var l = length ? length : 15;

  if (now == last) {
    repeat++;
  } else {
    repeat = 0;
    last = now;
  }

  var s = (now + repeat).toString();

  return +s.substr(s.length - l);
}

function timestamp() {
  return new Date().getTime();
}

function signature(req, params) {
  if (!req) return null;

  var baseURI = joinToken(params);

  return (0, _sha2.default)([encodeURIComponent(req.method.toUpperCase()), '&', req.url.toLowerCase(), '&', baseURI].join(''));
}

function oauth1(req, params, method) {
  if (!req) return null;

  var p = params && _underscore2.default.isObject(params) ? params : {};

  p.oauth_nonce = nonce(15);
  p.oauth_signature_method = method ? method : 'HMAC-SHA1';
  p.oauth_timestamp = timestamp();
  p.oauth_version = '1.0';
  p.oauth_signature = signature(req, p);

  return p;
}