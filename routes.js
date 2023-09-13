const fs = require("fs");

const requestHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  // process.exit()
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    // Display the form if the URL is "/"
    res.write("<html>");
    res.write("<head> <title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST" > <input type="text" name="message"> <button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    // Read data from request and push it into an array
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(`parsed Body: ${JSON.stringify(parsedBody)}`);
      // it will be message=awad and i want to split it to awad only so
      const message = parsedBody.split("=")[1];
      console.log(message);
      //working with async code
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First page </title></head>");
  res.write("<body> <h1>Hello from Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  handler: requestHandler,
  someText: "some hard text",
};

// module.exports = requestHandler

// module.exports.handler = requestHandler
// module.exports.someText = "some hard text "

// exports.handler = requestHandler;
// exports.someText = "some hard text";
