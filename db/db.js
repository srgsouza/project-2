const mongoose = require('mongoose');
const db = mongoose.connection;
// const url = 'mongodb://localhost:27017/bikes-trails';
const url = 'mongodb+srv://ss-user:lxH3y4j7Rdf3k7ir@codeserg-oy22e.mongodb.net/bikes-trails?'
// const url = 'mongodb+srv://ss-user:lxH3y4j7Rdf3k7ir@codeserg-oy22e.mongodb.net/bikes-trails?retryWrites=true'


mongoose.connect(url, { useNewUrlParser: true })

db.on('connected', () => {
  console.log("DB is connected");
})

db.on('disconnected', () => {
  console.log("DB is disconnected");
})

db.on('error', (err) => {
  console.log('DB error: ' + err);

})

module.exports = url;