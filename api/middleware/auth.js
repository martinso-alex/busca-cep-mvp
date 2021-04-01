const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accessTokenSecret = 'yatscrt!!-04';
const password_hash = "d7ecdf25eaf3deba0f2628771dbdd22d4138ab6cf38f91ed02a2ca0dec7c8ab7";

exports.get_access_token = function (req, res, next) {
  const password = req.params.password;

  if (crypto.createHash("sha256").update(password).digest("hex") === password_hash) {
    const access_token = jwt.sign({role: "avaliador"}, accessTokenSecret);
    res.json({ access_token });
  } else {
    res.json('Senha incorreta.');
  }
}

exports.authenticate_token = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, role) => {
          if (err) return res.sendStatus(403);

          next();
      });
  } else {
      res.sendStatus(401);
  }
}
