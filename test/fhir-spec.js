var expect, FHIR;

expect = require("expect.js");
FHIR = require("../lib/fhir.js");

describe("FHIR-JS", function () {

    describe("Constructor", function () {
        it("should throw an error if a URL parameter is not provided", function () {
            expect(function () {
                new FHIR();
            }).to.throwException(function (e) {
                expect(e).to.be.a(Error);
                expect(e.message).to.be("Please provide a URL parameter.");
            });
        });
        it("should return a FHIR object if a URL string is provided", function () {
            var fhir;
            fhir = new FHIR("https://fhir.herokuapp.com");
            expect(fhir).to.be.a(FHIR);
        });
        it("should return a FHIR object if a URL object is provided", function () {
            var fhir;
            fhir = new FHIR({
                url: "https://fhir.herokuapp.com"
            });
            expect(fhir).to.be.a(FHIR);
        });
    });

});
