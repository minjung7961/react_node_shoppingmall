const express = require('express');
const router = express.Router();
const getConnection = require('../lib/mariaDB');
const exec_sql = require('../lib/exec_sql');

router.get('/cg4', (req, res) => {
  
  getConnection((conn) => {
    (async() => {
      try {
        let sql = "SELECT itemcd _id, itemnm name FROM sys_cd_item WHERE grpcd = 'PD103' AND itemcd like '0123020%' \n"
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
	

