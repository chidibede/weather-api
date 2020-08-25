require("dotenv").config();
const http = require("http");
const https = require("https");
const url = require("url");
const nodeStatic = require("node-static");
const fs = require("fs");
const lookup = require("mime-types").lookup;

let fileServer = new nodeStatic.Server("./public");

// api key
const api_key = process.env.API_KEY;

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    let parsedURL = url.parse(req.url, true);
    //remove the leading and trailing slashes
    let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
    if (path == "") {
      path = "index.html";
    }

    let file = fileServer.root + "/" + path;
    //async read file function uses callback
    fs.readFile(file, function (err, content) {
      if (err) {
        console.log(`File Not Found ${file}`);
        res.writeHead(404);
        res.end();
      } else {
        //specify the content type in the response
        res.setHeader("X-Content-Type-Options", "nosniff");
        let mime = lookup(path);
        res.writeHead(200, { "Content-type": mime });
        res.end(content);
      }
    });
  } else if (req.url === "/requests/london" && req.method === "GET") {
      await https.get(
        `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${api_key}`,
        (resp) => {
          let body = "";
          resp.on("data", (chunk) => {
            body += chunk;
          });

          resp.on("end", () => {
            const apiBody = JSON.parse(body);
            res.writeHead(200, { "content-type": "application/json" });
            res.write(JSON.stringify(apiBody.main));
            res.end();
          });
        }
      );
    }else if (req.url === "/requests/malabo" && req.method === "GET") {
        await https.get(
          `https://api.openweathermap.org/data/2.5/weather?q=malabo&appid=${api_key}`,
          (resp) => {
            let body = "";
            resp.on("data", (chunk) => {
              body += chunk;
            });
  
            resp.on("end", () => {
              const apiBody = JSON.parse(body);
              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(apiBody.main));
              res.end();
            });
          }
        );
      }else if (req.url === "/requests/lagos" && req.method === "GET") {
        await https.get(
          `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=${api_key}`,
          (resp) => {
            let body = "";
            resp.on("data", (chunk) => {
              body += chunk;
            });
  
            resp.on("end", () => {
              const apiBody = JSON.parse(body);
              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(apiBody.main));
              res.end();
            });
          }
        );
      }else if (req.url === "/requests/manchester" && req.method === "GET") {
        await https.get(
          `https://api.openweathermap.org/data/2.5/weather?q=manchester&appid=${api_key}`,
          (resp) => {
            let body = "";
            resp.on("data", (chunk) => {
              body += chunk;
            });
  
            resp.on("end", () => {
              const apiBody = JSON.parse(body);
              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(apiBody.main));
              res.end();
            });
          }
        );
      }else if (req.url === "/requests/california" && req.method === "GET") {
        await https.get(
          `https://api.openweathermap.org/data/2.5/weather?q=california&appid=${api_key}`,
          (resp) => {
            let body = "";
            resp.on("data", (chunk) => {
              body += chunk;
            });
  
            resp.on("end", () => {
              const apiBody = JSON.parse(body);
              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(apiBody.main));
              res.end();
            });
          }
        );
      } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.write("Page not Found");
      res.end();
    }
  });

const port = process.env.PORT || 5000;

server.listen(port, (error) => {
  if (error) {
    console.log("Error encountered while trying to serve the app", error);
  } else {
    console.log(`Server listening on localhost:${port}`);
  }
});
