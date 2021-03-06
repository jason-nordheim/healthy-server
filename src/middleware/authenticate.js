var jwt = require("jsonwebtoken");
const { jwt_opt, jwt_key } = require("../config/app.config");
const isAfter = require("date-fns/isAfter");

const authenticateUser = (req, res, next) => {
  //console.log({ headers: req.header });
  if (!req.headers.authorization) {
    return res.status(400).send();
  }
  const token = req.headers.authorization.split(" ")[1];
  //console.log("token", { token });
  try {
    const decoded_token = jwt.verify(token, jwt_key, jwt_opt);
    const token_expires = new Date(decoded_token.exp * 1000);

    if (isAfter(Date.now, token_expires)) {
      return res
        .status(403)
        .json({ error: `token expired at ${token_expires}` })
        .send();
    }
    req.headers.user_id = decoded_token.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error }).send();
  }
};

module.exports = {
  authenticateUser,
};
