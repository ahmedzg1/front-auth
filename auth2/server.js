const express=require("express")
const connectDB=require('./config/dbconnect')
const app = express();

require("dotenv").config();
connectDB();
app.use(express.json())
app.use("/user",require("./routes/User"))




const PORT = process.env.PORT;

app.listen(PORT,(err) =>
err ? console.log(err) : console.log("server is running")
);