const MongoClient = require('mongodb').MongoClient;
const { dbName } = require('./db');

// Check if the script is being run with the 'test' argument
const isTest = process.argv[2] === 'test';
// If it is, set dbName to 'acebook_test'. Otherwise, use the dbName from db.js
const dbNameToClear = isTest ? 'acebook_test' : dbName;

const url = `mongodb://localhost:27017/${dbNameToClear}`;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbNameToClear);

    dbo.listCollections().toArray(function (err, collections) {
        if (err) throw err;

        collections.forEach(function (collection) {
            dbo.collection(collection.name).drop(function (err, delOK) {
                if (err) throw err;
                if (delOK) console.log("Collection", collection.name, "deleted");
            });
        });

        db.close();
    });
});