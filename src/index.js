var promise_request = require("request-promise")

var Api = function(hosts){
    this.hosts = hosts;
}

Api.prototype = {
        get : function(host, route, data){
            // generate uri from host and route and https/http
            var host_path = this.hosts[host];
            if(typeof host_path == "undefined") throw "host (" + host + " is not defined)";
            var request_type = "http://"; // TODO - enable clientside security
            var uri = request_type + host_path + route;

            // request queue id and trading id from api
            var options = {
                method : 'GET',
                url: uri,
                json : true, // default to json
                qs : data, // convert "data" to qs
            }
            return promise_request(options);
        }
}

module.exports = Api;
