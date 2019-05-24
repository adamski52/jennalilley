const express = require("express");
const proxy = require("http-proxy-middleware");
const app = express();
const port = 3000;

app.use(express.static("build"));

app.use("/api", proxy({
    target: "http://localhost:8080"
}));

app.listen(port, () => {
    console.log('UI Server listening on port ' + port);
});
