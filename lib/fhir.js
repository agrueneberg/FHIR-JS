"use strict";

var https, http, url, request, FHIR;

https = require("https");
http = require("http");
url = require("url");

request = function (options, body, callback) {
    var responseHandler, req;
    if (callback === undefined && typeof(body) === "function") {
        callback = body;
        body = undefined;
    }
    responseHandler = function (res) {
        var body;
        body = "";
        res.on("data", function (chunk) {
            body += chunk;
        });
        res.on("end", function () {
            var path;
            if ([200, 204].indexOf(res.statusCode) !== -1) {
                if (res.headers["content-type"].indexOf("application/json") === 0) {
                    body = JSON.parse(body);
                }
                callback(null, body);
            } else if (res.statusCode === 201) {
                path = res.headers.location.split("/");
                callback(null, {
                    type: path[1],
                    id: path[2],
                    vid: path[4]
                });
            } else {
                callback({
                    statusCode: res.statusCode,
                    message: body
                });
            }
        });
    };
    // Setting withCredentials to false is required until
    // https://github.com/substack/http-browserify/pull/47 is fixed.
    options.withCredentials = false;
    if (options.protocol === "https:") {
        req = https.request(options, responseHandler);
    } else {
        req = http.request(options, responseHandler);
    }
    if (body !== undefined) {
        req.write(body);
    }
    req.end();
};

FHIR = function (url) {
    if (typeof url === "string") {
        this.url = url;
    } else if (url !== null && typeof url === "object" && url.hasOwnProperty("url") === true) {
        this.url = url.url;
    } else {
        throw new Error("Please provide a URL parameter.");
    }
 // Remove trailing "/" from URL.
    if (this.url.indexOf("/", this.url.length - 1) !== -1) {
        this.url = this.url.substring(0, this.url.length - 1);
    }
 // Prepare credentials.
    this.auth = null;
};

FHIR.prototype.credentials = function (username, password) {
    this.auth = username + ":" + password;
};

FHIR.prototype.read = function (type, id, callback) {
    var options;
    options = url.parse(this.url + "/" + type + "/" + id);
    options.method = "GET";
    if (this.auth !== null) options.auth = this.auth;
    request(options, callback);
};

FHIR.prototype.vread = function (type, id, vid, callback) {
    var options;
    options = url.parse(this.url + "/" + type + "/" + id + "/_history/" + vid);
    options.method = "GET";
    if (this.auth !== null) options.auth = this.auth;
    request(options, callback);
};

FHIR.prototype.update = function (type, id, body, callback) {
    var options;
    options = url.parse(this.url + "/" + type + "/" + id);
    options.method = "PUT";
    options.headers = {
        "Content-Type": "application/json"
    };
    if (this.auth !== null) options.auth = this.auth;
    request(options, JSON.stringify(body), callback);
};

FHIR.prototype.delete = function (type, id, callback) {
    var options;
    options = url.parse(this.url + "/" + type + "/" + id);
    options.method = "DELETE";
    if (this.auth !== null) options.auth = this.auth;
    request(options, callback);
};

FHIR.prototype.create = function (type, body, callback) {
    var options;
    options = url.parse(this.url + "/" + type);
    options.method = "POST";
    options.headers = {
        "Content-Type": "application/json"
    };
    if (this.auth !== null) options.auth = this.auth;
    request(options, JSON.stringify(body), callback);
};

FHIR.prototype.search = function (type, params, callback) {
    var options;
    if (callback === undefined && typeof(params) === "function") {
        callback = params;
        params = type;
        type = null;
    }
    if (type !== null) {
        options = url.parse(this.url + "/" + type);
    } else {
        options = url.parse(this.url + "/");
    }
    Object.keys(params).forEach(function (param, idx) {
        if (idx === 0) {
            options.path = options.path + "?";
        } else {
            options.path = options.path + "&";
        }
        options.path = options.path + param + "=" + params[param];
    });
    options.method = "GET";
    if (this.auth !== null) options.auth = this.auth;
    request(options, callback);
};

FHIR.prototype.history = function (type, id, callback) {
    var options;
    if (callback === undefined && id === undefined && typeof(type) === "function") {
        callback = type;
        id = null;
        type = null;
    } else if (callback === undefined && typeof(id) === "function") {
        callback = id;
        id = null;
    }
    if (type !== null && id !== null) {
        options = url.parse(this.url + "/" + type + "/" + id + "/_history");
    } else if (type !== null && id === null) {
        options = url.parse(this.url + "/" + type + "/_history");
    } else {
        options = url.parse(this.url + "/_history");
    }
    options.method = "GET";
    if (this.auth !== null) options.auth = this.auth;
    request(options, callback);
};

FHIR.prototype.govread = function (type, id, callback) {
    var options;
    options = url.parse(this.url + "/.well-known/governance?resource=" + encodeURIComponent("/" + type + "/" + id));
    options.method = "GET";
    if (this.auth !== null) options.auth = this.auth;
    request(options, callback);
};

FHIR.prototype.govwrite = function (type, id, body, callback) {
    var options;
    options = url.parse(this.url + "/.well-known/governance?resource=" + encodeURIComponent("/" + type + "/" + id));
    options.method = "PUT";
    options.headers = {
        "Content-Type": "application/json"
    };
    if (this.auth !== null) options.auth = this.auth;
    request(options, JSON.stringify(body), callback);
};

module.exports = FHIR;
