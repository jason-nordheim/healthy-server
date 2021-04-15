// node modules
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const cors = require("cors");

// configuration
const { port, jwt_key, salt_rounds, jwt_opt } = require("./config/app.config");
const { models } = require("./config/mongoose.config");
const { authenticateUser } = require("./middleware/authenticate");
const { searchFoods } = require("./util/edaman.api");

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

/**
 * Get user profile
 */
app.get("/api/users", authenticateUser, (req, res) => {
  // user_id added as part of authenticateUser middleware
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

/**
 * Update a single user
 */
app.patch("/api/users", authenticateUser, async (req, res) => {
  // user_id added as part of authenticateUser middleware
  const updatedUser = await models.user.updateOne(
    { _id: req.headers.user_id },
    { ...req.body }
  );

  // update failed
  if (!updatedUser.ok) {
    // todo: send error message
    res.status(400).send();
  }

  // update did not fail
  const user = await models.user.findOne({ _id: req.headers.user_id });
  const { first, last, email, height, day, month, year } = user;
  res.status(200).json({ first, last, email, height, day, month, year });
});

/**
 * Login Route Handler
 * - creates a token that expires in 24 hours
 */
app.post("/api/login", async (req, res) => {
  try {
    const params = {
      email: req.body.user.email,
      password: req.body.user.password,
    };
    // find related user
    const user = await models.user.findOne({
      email: params.email,
    });
    // validate provided credentials
    const validPassword = await bcrypt.compare(
      params.password,
      user.password_digest
    );
    if (validPassword) {
      // sign token
      const token = await jwt.sign({ id: user.id }, jwt_key, jwt_opt);
      // send token as json
      await res.status(200).json({ token }).send();
    } else await res.status(401).send();
  } catch (error) {
    // something went wrong
    await res.status(400).json({ error: error.message }).send();
  }
});

app.get("/api/weights", authenticateUser, async (req, res) => {
  try {
    const userWeights = await models.weight.find({
      userId: req.headers.user_id,
    });
    await res.status(200).json(userWeights);
  } catch (error) {
    return await res.status(500).json({ error });
  }
});

app.post("/api/weights", authenticateUser, async (req, res) => {
  try {
    const { kg, source } = req.body;
    if (kg && req.headers.user_id) {
      const newWeight = await models.weight({
        kg,
        source,
        userId: req.headers.user_id,
      });
      const savedWeight = await newWeight.save();
      // console.log(savedWeight);
      await res.status(201).json(savedWeight);
    } else {
      // console.log({ body: req.body, userId: req.headers.user_id });
      return await res
        .status(400)
        .json({ error: "Missing required parameters" });
    }
  } catch (error) {
    return await res.status(500).json({ error });
  }
});

app.delete("/api/weights", authenticateUser, async (req, res) => {
  try {
    // make sure we have a weight id record to delete
    if (!req.body._id) {
      return res.status(400).json({ error: "Missing parameter: `_id`" });
    }

    const userId = req.headers.user_id;
    const weightId = req.body._id;

    await models.weight.deleteOne({ _id: weightId, userId });
    return await res.status(200).send();
  } catch (error) {
    return await res.status(500).json({ error });
  }
});

/**
 * Endpoint for searching foods
 */
app.get("/api/foods/search", async (req, res) => {
  try {
    const result = await searchFoods(req.query.query);
    res.status(200).json(result.data);
  } catch (error) {
    console.error({ error });
    return await res.status(500).json({ error });
  }
});

app.post("/api/food", authenticateUser, async (req, res) => {
  const userId = req.headers.user_id;
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
