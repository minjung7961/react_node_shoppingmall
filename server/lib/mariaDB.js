"use strict";
const mysql = require('mysql');
const Local = require('../config/aissgoDB.js');

let pool = mysql.createPool(Local);

function getConnection(callback) {
  console.log(`[LIB-DB] CONNECTION LIMIT: ${pool.config.connectionLimit} / CONN IN USE + BEING CREATED: ${pool._allConnections.length} / FREE CONN AWAITING USE: ${pool._freeConnections.length}`);
  pool.getConnection(function (err, conn) {
    if(err) {
      console.log("db error" + err);
    }else{
      callback(conn);
    }
  });
}

module.exports = getConnection;
