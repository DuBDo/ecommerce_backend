const express = require("express");
const handleError = require("./utils/handleError");
const user = require("./routes/user.route");

const app = express();

app.use(express.json());

app.get('/',(req, res, next)=>{
    res.send('Server is On');
})

app.use("/api/V1", user);
app.use(handleError);

module.exports = app;