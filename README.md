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

4. Provide credentials

        fhir.credentials("username", "password");

Methods
-------

### read
Read the current state of a resource.

###### Parameters
1. `type`
2. `id`
3. `callback`

### vread
Read the state of a specific version of a resource.

###### Parameters
1. `type`
2. `id`
3. `vid`
4. `callback`

### update
Update an existing resource by its id (or create it if it is new).

###### Parameters
1. `type`
2. `id`
3. `doc`
4. `callback`

### delete
Delete a resource.

###### Parameters
1. `type`
2. `id`
3. `callback`

### history
Retrieve the update history for a particular resource.

###### Parameters
1. `[type]`
2. `[id]`
3. `callback`

### create
Create a new resource with a server assigned ID.

###### Parameters
1. `type`
2. `callback`

### search
Search the resource type based on some filter criteria.

###### Parameters
1. `[type]`
2. `params`
3. `callback`

### credentials
Set FHIR credentials for requests.

###### Parameters
1. `username`
2. `password`
