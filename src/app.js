const express = require("express");
const handleError = require("./utils/handleError");
const router = require("./routes/index.js");

const app = express();

app.use(express.json());

app.get('/',(req, res, next)=>{
    res.send('Home Page');
})

app.use("/api/V1", router);
app.use(handleError);

module.exports = app;