const express = require("express");
const { port } = require("./config/app.config");
const app = express();

app.get("/", (req, res, next) => {
  res.send("<h1>Hello world</h1>");
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
