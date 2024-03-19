//=================== before ES6 syntax ======================

var MongoClient = require("mongodb").MongoClient;
var _db;
const uri = "mongodb://localhost:27017";
// const uri = "mongodb://127.0.0.1:27017";
const db_name = "TRANQUILO";

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        _db = client.db(db_name);
        return callback(err);
      }
    );
  },
  getDb: function () {
    return _db;
  },
};

//====================== ES6 syntax ===========================

// import  MongoClient  from "mongodb";
// var _db;
// const uri = "mongodb://localhost:27017";
// const db_name = "NARCOS_GROUP_DB";

// export function connectToServer(callback) {
//   MongoClient.connect(
//     uri,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function (err, client) {
//       _db = client.db(db_name);
//       return callback(err);
//     }
//   );
// }
// export function getDb() {
//   return _db;
// }
