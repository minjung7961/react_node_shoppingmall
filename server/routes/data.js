const express = require('express');
const router = express.Router();
const getConnection = require('../lib/mariaDB');
const exec_sql = require('../lib/exec_sql');
const {getCG4} = require('./sql')

router.get('/cg4', (req, res) => {
  
  getConnection((conn) => {
    (async() => {
      try {
        let sql = getCG4;
        let results = await exec_sql(conn, sql);
        res.send({
          success: true,
          data: results
        });
      } catch(err){
        console.log(err);
      } finally{
        conn.release();
      }
    })();
  })
});

module.exports = router;
	

