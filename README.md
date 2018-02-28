# api-request-simple

[![npm](https://img.shields.io/npm/v/api-request-simple.svg?style=flat-square)](https://www.npmjs.com/package/api-request-simple)
[![npm](https://img.shields.io/npm/dm/api-request-simple.svg)](https://www.npmjs.com/package/api-request-simple)

This module  wraps the request module for simple REST api interfacing with predetermined hosts

It is meant to be used in situations where you have a finite and predetermined set of hosts which you regularly interact with.  

# Example
In these cases
```js
var hosts = require("/config/hosts.json")
var api = new (require("api-request-simple"))(hosts)

var data = {foo : "bar"}
api.get("host_name", "/request/path/", data)
```

replaces

```js
var hosts = require("/config/hosts.json")
var data = {foo : "bar"}

// request queue id and trading id from api
var options = {
    method : 'GET',
    url: "http://" + hosts["host_name"] + "/request/path",
    json : true, // default to json
    qs : data, // convert "data" to qs
}
return promise_request(options);

```


and it particularly shines when you wish to use requests with client-certificates:

TODO
