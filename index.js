const http = require("http");
// const routes = require("./routes");

// const server = http.createServer(routes.handler);
// console.log(routes.someText);

const express = require("express");

const app = express();

app.use((res, req, next) => {
  console.log("first middleware");
  next(); // if we don't call this function then the request will not be processed further
});

app.use((res, req, next) => {
  console.log("second middle ware");
  next(); // if we don't call this function then the request will not be processed further
});

const server = http.createServer(app);

server.listen("3000");
