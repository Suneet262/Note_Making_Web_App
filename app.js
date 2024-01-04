const dotenv = require("dotenv")
const express = require("express");
dotenv.config();
require("./database/config").connect();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.get("/",(req,res)=>{
    res.send("<h1>Server is working</h1>");
});



module.exports = app;