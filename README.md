FHIR-JS
=======

A Node.js and browser module for interacting with an HL7 [Fast Health Interoperable Resources (FHIR)](http://www.hl7.org/implement/standards/FHIR-Develop/) endpoint.

Example
-------

    var FHIR, fhir;
    FHIR = require("fhir");
    fhir = new FHIR({
        url: "https://fhir.example.com"
    });
    fhir.read("Patient", "e7cbe73f808a4943ba7769db96aa2fea", function (err, res) {
        console.log(res);
    });

Usage
-----

### Browser

1. Include it:

        <script src="http://agrueneberg.github.io/FHIR-JS/fhir.min.js"></script>

2. Require it:

        var FHIR = require("fhir");

3. Instantiate a FHIR client

        var fhir = new FHIR({
            url: "https://fhir.example.com",
        });
