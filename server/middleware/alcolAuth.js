const { User } = require('../models/User');

const getConnection = require('../lib/mariaDB');
const exec_sql = require('../lib/exec_sql');

let alcolAuth = (req, res, next) => {
  let token = req.cookies.w_auth;

  getConnection((conn) => {
    (async() => {
      try {
        let id = '1636956783';
        let sql = " SELECT certreqid FROM ln_auth_feature WHERE certreqid = ? \n";
        let results = await exec_sql(conn, sql, id);
        console.log(results);
        console.log(results.length);
        console.log(results[0].certreqid);
        req.alcolUserId = results[0].certreqid;
      } catch(err){
      } finally{
        conn.release();
      }
    })();
  })

 // 인증된 사용자인지 검사하는 코드
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { alcolAuth };
