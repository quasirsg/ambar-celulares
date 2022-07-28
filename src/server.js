const express = require("express");
const bodyParser = require("body-parser");

const {
  exampleMessage,
  registerUser2fa,
  verifyUserAndToken2fa,
  validateToken,
} = require("./backend/2fa");

const app = express();
const http = require("http").createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/exampleMessage", exampleMessage);
app.post("/api/register", registerUser2fa);
app.post("/api/verify", verifyUserAndToken2fa);
app.post("/api/validate", validateToken);

http.listen(3000, function () {
  console.log("listening on *:3000");
});
