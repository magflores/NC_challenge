const http = require('http')
const fs = require('fs')
const url = require('url')
const port = 8080

const server = http.createServer((req, res) => {
    let parsedURL = url.parse(req.url, true);
    let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
    if (path == "") {
        path = "index.html";
    }
    console.log(`Requested path ${path} `)
    let file = __dirname + "/public/" + path;
    fs.readFile(file, function(err, content) {
        if (err) {
            console.log(`File not found ${file}`);
            res.writeHead(404);
            res.end();
        } else {
            console.log(`Returning ${path}`);
            res.setHeader("X-Content-Type-Options", "nosniff");
            switch(path) {
                case "styles.css":
                    res.writeHead(200, { "Content-Type": "text/css" });
                    break;
                case "main.js":
                    res.writeHead(200, { "Content-Type": "application/javascript" });
                    break;
                case "index.html":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    break;
            }
            res.end(content);
        }
    });
})

server.listen(port, "localhost", () => {
    console.log("Listening on port " + port);
})