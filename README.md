## Author ![npm](https://badge.fury.io/js/author.png)

A simple token and signature creator for OAuth by [turing](https://npmjs.org/~turing)

### Installation
````
$ npm install --save author
````

### Example
````javascript
import Author from 'author'

var oauthParams = Author.oauth1({
  method: 'get',
  url: 'http://abc.com'
},{
  oauth_callback: '123',
  oauth_consumer_key: '123333',
});
````
result will be something like:
````
{
  oauth_callback: '123',
  oauth_consumer_key: '123333',
  oauth_nonce: 137982814214500,
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: 1379828142145,
  oauth_version: '1.0',
  oauth_signature: 'a2498dcdce3336e471cb039798bf0376924351f5'
}
````

### API
check this file: `index.js`

### Contributing
- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3

### MIT license
Copyright (c) 2013 turing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


---
![docor](https://cdn1.iconfinder.com/data/icons/windows8_icons_iconpharm/26/doctor.png)
generated using [docor](https://github.com/turingou/docor.git) @ 0.1.0. brought to you by [turingou](https://github.com/turingou)
