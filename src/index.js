// node modules
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const cors = require("cors");

// configuration
const { port, jwt_key, salt_rounds, jwt_opt } = require("./config/app.config");
const { models } = require("./config/mongoose.config");
const { authenticateUser } = require("./middleware/authenticate");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

/**
 * Create a new User
 */
app.post("/api/users", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.user.password, salt_rounds);
    const user_params = {
      ...req.body.user,
      password: undefined,
      password_digest: hashedPass,
    };
    const user = new models.user({ ...user_params });
    const savedUser = await user.save();
    await res
      .status(201)
      .json({ ...savedUser })
      .send(savedUser);
  } catch (error) {
    // Email address already exists
    if (error.name === "MongoError" && error.code === 11000) {
      const error = `Account already exists with email: ${req.body.user.email}`;
      return res.status(400).json({ error }).send();
    }
    // unhandled exception
    return res.status(400).json({ error: error }).send();
  }
});

app.get("/api/users", authenticateUser, (req, res) => {
  models.user
    .findOne({ _id: req.headers.user_id })
    .then((user) => {
      const { first, last, email, day, month, year, height } = user;
      res.json({ first, last, email, day, month, year, height });
    })
    .catch((err) => {
      // todo: this should handled better,
      // error indicates no user found
      console.error(err);
      res
        .status(500)
        .json(JSON.stringify({ error: err }))
        .send();
    });
});

app.patch("/api/users", authenticateUser, async (req, res) => {
  const user = await models.user.findOne({ _id: req.header.user_id });
  console.log(user);
  res.send(user);
});

app.post("/api/login", async (req, res) => {
  try {
    const params = {
      email: req.body.user.email,
      password: req.body.user.password,
    };
    const user = await models.user.findOne({
      email: params.email,
    });
    //console.debug("user", user);
    const validPassword = await bcrypt.compare(
      params.password,
      user.password_digest
    );
    if (validPassword) {
      const token = await jwt.sign({ id: user.id }, jwt_key, jwt_opt);
      await res.status(200).json({ token }).send();
    } else await res.status(401).send();
  } catch (error) {
    await res.status(400).json({ error: error.message }).send();
  }
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
