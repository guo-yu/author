var author = require('../dist/author')

var oauthParams = author.oauth1({
  method: 'get',
  url: 'http://abc.com'
}, {
  oauth_callback: '123',
  oauth_consumer_key: '123333',
});

console.log(oauthParams)
