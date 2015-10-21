var express = require('express');
var app = express();
var Datastore = require('nedb');
var db = new Datastore( { inMemoryOnly: true });

var model = {
    namespace: "jsreport",
    entityTypes: {
        "UserType": {
            "_id": {"type": "Edm.String", key: true},
            "test": {"type": "Edm.String"}//,
            //"num": {"type": "Edm.Int32"},
            //"d": {"type": "Edm.DateTimeOffset"},
            //"addresses": { "type": "Collection(jsreport.AddressType)"}
        }
    },
    /*complexTypes: {
        "AddressType": {
            "street": {"type": "Edm.String"}
        }
    },*/
    entitySets: {
        "users": {
            entityType: "jsreport.UserType"
        }
    }
};

var ODataServer = require("./../index.js");

var odataServer = new ODataServer()
    .model(model)
    .onNeDB(function(es, cb) { 
        cb(null, db);
    });

    app.use('/odata', odataServer.handle.bind(odataServer));

    app.use(express.static('./../example_client'));

    app.listen(process.env.PORT || 3000, function() {
        console.log("Server running...")
    });


db.insert({"_id": "1", "test": "a", num: 1, addresses: [{ "street":"a1"}]});
db.insert({"_id": "2", "test": "b", num: 2, addresses: [{ "street":"a2"}] });
db.insert({"_id": "3", "test": "c", num: 3});
db.insert({"_id": "4", "test": "d", num: 4});
db.insert({"_id": "5", "test": "e", num: 5});
