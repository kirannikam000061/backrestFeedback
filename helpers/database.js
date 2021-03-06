const mongoose = require("mongoose")
const constants = require("./../config/constants")

if(constants.environment != "prod") { // remove for production
    mongoose.set('debug', true)
}

var dbURI = constants.database[constants.environment]

const options = {
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    useUnifiedTopology: true
  }

let services = {}
//function to connect database
services.dbConnect = function(){
    console.log("dbURI", dbURI)
  const db = mongoose.connect(dbURI,options)
  mongoose.set('useFindAndModify', true);
  mongoose.connection.on('error', function (err) {
    console.log("Error: "+ err)
   })

  mongoose.connection.on('disconnecting', function(){
      console.log('db: mongodb is disconnecting!!!')
  })

  mongoose.connection.on('disconnected', function(){
      console.log('db: mongodb is disconnected!!!')
  })

  mongoose.connection.on('reconnected', function(){
      console.log('db: mongodb is reconnected: ' + dbURI)
  })

  mongoose.connection.on('timeout', function(e) {
      console.log("db: mongodb timeout "+e)
      // reconnect here
  })

  mongoose.connection.on('close', function(){
      console.log('db: mongodb connection closed')
  })
}

module.exports = services
