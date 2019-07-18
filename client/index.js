const express = require("express");
const proxy = require("http-proxy-middleware");
const app = express();
const path = require("path");
const https = require("https");
const fs = require("fs");
const env = require("dotenv");
env.config();

const port = process.env.PORT;
const pkPassphrase = process.env.PK_PASSPHRASE;

app.use((req, res, next) => {
    if (req.secure) {
        next();
        return;
    }

    res.redirect("https://" + req.headers.host + req.url);
});

app.use(express.static("build"));

app.use("/api", proxy({
    target: "http://api:8080"
}));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

https.createServer({
    key: fs.readFileSync("certificate-private-key.txt"),
    cert: fs.readFileSync("certificate-body.txt"),
    passphrase: pkPassphrase
}, app).listen(port, () => {
    console.log("UI Server listening on port " + port);
});
