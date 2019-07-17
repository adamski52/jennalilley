const express = require("express");
const proxy = require("http-proxy-middleware");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static("build"));

app.use("/api", proxy({
    target: "http://api:8080"
}));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

app.listen(port, () => {
    console.log('UI Server listening on port ' + port);
});
