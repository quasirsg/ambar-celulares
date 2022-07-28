const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.use(express.static("public"));

app.get("/chave", (req, res) => res.send("Toma tu Chaves"));

http.listen(3000, function () {
  console.log("listening on *:3000");
});
