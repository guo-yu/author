import sha1 from 'sha1'
import _ from 'underscore'

export function joinToken(obj) {
  var list = []

  _.each(obj, (value, key) =>
    list.push(encodeURIComponent(key + '=' + value)))

  return list.sort().join('&')
}

export function parseToken(string) {
  var list = string.split('&')
  var map = {}

  list.forEach(item =>
    map[item.substr(0, item.indexOf('='))] = item.substr(item.indexOf('=') + 1))

  return map
}

export const token = {
  join: joinToken,
  parse: parseToken
}

export function nonce(length) {
  var last = null;
  var repeat = 0;
  var now = Math.pow(10, 2) * +new Date()
  var l = length ? length : 15;

  if (now == last) {
    repeat++
  } else {
    repeat = 0
    last = now
  }

  var s = (now + repeat).toString()

  return +s.substr(s.length - l)
}

export function timestamp() {
  return new Date().getTime()
}

export function signature(req, params) {
  if (!req)
    return null

  var baseURI = joinToken(params)

  return sha1([
    encodeURIComponent(req.method.toUpperCase()),
    '&',
    req.url.toLowerCase(),
    '&',
    baseURI
  ].join(''));
}

export function oauth1(req, params, method) {
  if (!req)
    return null

  var p = (params && _.isObject(params)) ? params : {}

  p.oauth_nonce = nonce(15)
  p.oauth_signature_method = method ? method : 'HMAC-SHA1'
  p.oauth_timestamp = timestamp()
  p.oauth_version = '1.0';
  p.oauth_signature = signature(req, p)

  return p
}
