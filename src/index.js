//npm joi
//password hashing in model or schema
//next()
//why need bearer(stateful ko lagi)
//npm passport(to authentication token)


const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config();

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database Connected");
    new Promise((resolve)=>{
        app.listen(port, ()=>{
            console.log(`Server is listening to the port ${port}`);
            resolve();
        })
    })
}).catch((err)=>{
    console.log(err);
});