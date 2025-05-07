const express = require("express");
const handleError = require("./utils/handleError");
const router = require("./routes/index");

const app = express();

app.use(express.json());

app.get('/',(req, res, next)=>{
    res.send('Server is On');
})

app.use("/api/V1", router);
app.use(handleError);

module.exports = app;