const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); // allows mongodb sessions - requires session
const dbUri = require('./db'); // mongodb uri

const store = new MongoDBStore({
    uri: dbUri,
    collection: 'mySessions'
});

store.on('connected', function () {
    store.client; // The underlying MongoClient object from the MongoDB driver
});

// Catch errors
store.on('error', function (error) {
    assert.ifError(error);
    assert.ok(false);
});

module.exports = store;