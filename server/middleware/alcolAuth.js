const { User } = require('../models/User');

let alcolAuth = (req, res, next) => {
  console.log("alcolAuth'. req.user")
  console.log(req.user)
  let token = req.cookies.w_auth;

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
