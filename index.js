var _ = require('underscore');

exports.token = {
    join: function(obj) {
        var list = [];
        _.obj(function(value,key){
            list.push(encodeURIComponent(key + '=' + value));
        });
        return list.sort().join('&');
    },
    parse: function(string) {
        var list = string.split('&'),
        map = {};
        list.forEach(function(item) {
            map[item.substr(0, item.indexOf('='))] = item.substr(item.indexOf('=') + 1);
        });
        return map;
    }
}

exports.nonce = function(length) {
    var last = null,
        repeat = 0,
        now = Math.pow(10, 2) * +new Date(),
        l = length ? length : 15;
    if (now == last) {
        repeat++
    } else {
        repeat = 0
        last = now
    }
    var s = (now + repeat).toString();
    return +s.substr(s.length - l);
}

exports.timestamp = function() {
    return new Date().getTime();
}

exports.signature = function(req, params) {
    if (req) {
        var baseURI = exports.token.join(params);
        return [
            encodeURIComponent(req.method.toUpperCase()),
            '&',
            req.url.toLowerCase(),
            '&',
            baseURI
        ].join('');
    } else {
        return null;
    }
}

exports.oauth1 = function(req, params, method) {
    if (req) {
        var p = params && typeof(params) === 'object' ? params : {};
        p.oauth_nonce = exports.nonce(15);
        p.oauth_signature_method = method ? method : 'HMAC-SHA1';
        p.oauth_timestamp = exports.timestamp();
        p.oauth_version = '1.0';
        return exports.signature(req, p);
    } else {
        return null;
    }
}