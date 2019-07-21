const express = require("express");
const proxy = require("http-proxy-middleware");
const app = express();
const path = require("path");

app.use(express.static("build"));

app.use("/api", proxy({
    target: "http://api:8080"
}));

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

app.listen(3000);
