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
            if ([200, 204].indexOf(res.statusCode) !== -1) {
                callback(null, body);
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
};

FHIR.prototype.read = function (type, id, callback) {
    var options;
    options = url.parse(this.url + "/" + type + "/" + id);
    options.method = "GET";
    request(options, callback);
};

FHIR.prototype.vread = function (type, id, vid, callback) {
    var options;
    options = url.parse(this.url + "/" + type + "/" + id + "/_history/" + vid);
    options.method = "GET";
    request(options, callback);
};

FHIR.prototype.update = function (type, id, body, callback) {
    var options;
    options = url.parse(this.url + "/" + type + "/" + id);
    options.method = "PUT";
    options.headers = {
        "Content-Type": "application/json"
    };
    request(options, JSON.stringify(body), callback);
};

FHIR.prototype.delete = function (type, id, callback) {
    var options;
    options = url.parse(this.url + "/" + type + "/" + id);
    options.method = "DELETE";
    request(options, callback);
};

module.exports = FHIR;
