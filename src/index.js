var promise_request = require("request-promise")

var Api = function(params, defaults){
    this.hosts = params; // assume that the whole object is hosts
    if(typeof params.hosts != "undefined") this.hosts = params.hosts; // but if hosts is explicitly defined in params then redefine hosts
    if(typeof params.client_cert != "undefined") this.client_cert = params.client_cert; // define client_cert if it is given
    this.defaults = (params.defaults)? params.defaults : {}; // set the defaults if they exist
}

Api.prototype = {
    get : function(host, route, request_options){
        if(typeof request_options == "undefined") request_options = {};
        request_options.method = "GET"; // define the method
        return this.promise_request(host, route, request_options); // make general request
    },
    post : function(host, route, request_options){
        if(typeof request_options == "undefined") request_options = {};
        request_options.method = "POST"; // define the method
        return this.promise_request(host, route, request_options); // make general request
    },
    promise_request : function(host, route, request_options){
        // validate request
        if(typeof this.hosts[host] == "undefined") throw "host (" + host + ") is not defined)";

        // begin options with defaults
        var options = this.defaults;

        // append user defined options, overwrite defaults
        var options = Object.assign(options, request_options)

        // append client_cert parameters if client_cert is defined
        if(typeof this.client_cert != "undefined"){
            options.ssl = true; // enforce that we use https protocol
            options.cert = this.client_cert.cert;
            options.key = this.client_cert.key;
            options.ca = this.client_cert.ca;
        }

        // define protocol - should ssl be used or not
        var protocol = (options.ssl === true)? "https://" : "http://";
        options.ssl = null; // remove from options so it does not have any unintended consequences in request-promise

        // generate uri and define it in options and append client_cert if define
        var uri = protocol + this.hosts[host] + route;
        options.uri = uri;

        // pass the modified options to the request module
        return promise_request(options);
    }
}

module.exports = Api;
