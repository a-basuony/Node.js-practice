const express = require("express");
const bodyParsed = require("body-parser");
const app = express();

// app.use((res, req, next) => {
//   console.log("first middleware");
//   next(); // if we don't call this function then the request will not be processed further
// });

app.use(bodyParsed.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  console.log("this always runs!");
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title' ><button type='submit'>Send</button></input></form>"
  );
});
app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello From Express</h1>");
});

app.listen(3000);

// -----------------------

// const http = require("http");
// const routes = require("./routes");

// const server = http.createServer(routes.handler);
// console.log(routes.someText);

// const server = http.createServer(app);
// server.listen("3000");
