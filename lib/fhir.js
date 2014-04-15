"use strict";

var FHIR;

FHIR = function (url) {
    if (typeof url === "string") {
        this.url = url;
    } else if (url !== null && typeof url === "object" && url.hasOwnProperty("url") === true) {
        this.url = url.url;
    } else {
        throw new Error("Please provide a URL parameter.");
    }
};

module.exports = FHIR;
