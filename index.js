const express = require("express");
const server = express();
const helmet = require("helmet");
const port = process.env.PORT | 9001;

server.use(helmet());

server.get("/", (req, res) => {
  res
    .status(200)
    .send("Hello From server!")
    .end();
});

server.listen(port, () => {
  console.log(`\nListening at port: ${port}\n`);
});
